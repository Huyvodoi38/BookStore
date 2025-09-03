import merge from 'lodash/merge';
import raVietnameseMessages from '@completejavascript/ra-language-vietnamese';
import raEnglishMessages from 'ra-language-english';
import { TranslationMessages } from 'react-admin';

// Hàm để hợp nhất hai đối tượng một cách sâu
const customVietnameseMessages : TranslationMessages = merge(
    {},
    raEnglishMessages, // Bắt đầu với các key của tiếng Anh để đảm bảo không thiếu
    raVietnameseMessages, // Hợp nhất các bản dịch tiếng Việt vào
    {
        // Bạn có thể thêm các bản dịch tùy chỉnh của riêng mình ở đây
        // Ví dụ:
        // 'mycustomkey': 'Bản dịch tùy chỉnh',
    }
);

export default customVietnameseMessages;