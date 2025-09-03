const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình multer để lưu file với tên gốc + phần mở rộng
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage });

// Sử dụng middlewares mặc định của json-server (bao gồm CORS)
server.use(middlewares);

// Cấu hình CORS tùy chỉnh
server.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // port frontend
    exposedHeaders: ['X-Total-Count'] 
}));

// API upload ảnh
server.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Không có file được tải lên' });
    }
    const fileUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// Cho phép truy cập thư mục uploads
server.use('/uploads', express.static(uploadDir));

// Middleware lọc sách theo category_ids
server.use((req, res, next) => {
    if (req.path === '/api/books' && req.query.category_ids) {
        const allBooks = router.db.get('books').value();
        const requestedCategoryIds = Array.isArray(req.query.category_ids)
            ? req.query.category_ids.map(Number)
            : [Number(req.query.category_ids)];

        const filteredBooks = allBooks.filter(book =>
            requestedCategoryIds.every(id => book.category_ids.includes(id))
        );

        const start = parseInt(req.query._start, 10) || 0;
        const end = parseInt(req.query._end, 10) || filteredBooks.length;
        const sortField = req.query._sort || 'id';
        const sortOrder = req.query._order || 'ASC';

        const sortedBooks = filteredBooks.sort((a, b) => {
            if (a[sortField] > b[sortField]) return sortOrder === 'ASC' ? 1 : -1;
            if (a[sortField] < b[sortField]) return sortOrder === 'ASC' ? -1 : 1;
            return 0;
        });

        const paginatedBooks = sortedBooks.slice(start, end);
        res.setHeader('X-Total-Count', sortedBooks.length);
        return res.json(paginatedBooks);
    }
    next();
});

// Router JSON Server
server.use('/api', router);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🚀 JSON Server is running on http://localhost:${PORT}/api`);
    console.log(`📂 Upload endpoint: http://localhost:${PORT}/upload`);
});
