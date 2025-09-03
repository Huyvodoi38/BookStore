import jsonServerProvider from 'ra-data-json-server';
import type { DataProvider } from 'react-admin';

const API_URL = 'http://localhost:3001/api';
const UPLOAD_URL = 'http://localhost:3001/upload';

const baseProvider = jsonServerProvider(API_URL);

async function uploadImageAndGetUrl(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData });
    if (!res.ok) {
        throw new Error('Upload ảnh thất bại');
    }
    const data = await res.json();
    return data.url as string;
}

async function normalizeImage(value: any): Promise<string | null | undefined> {
    // undefined -> không đụng tới
    if (typeof value === 'undefined') return undefined;
    // null -> xóa ảnh
    if (value === null) return null;
    // string URL -> giữ nguyên
    if (typeof value === 'string') return value;

    const toUrl = async (v: any) => {
        if (!v) return null;
        if (v.rawFile) return uploadImageAndGetUrl(v.rawFile as File);
        if (v.src) return v.src as string;
        return null;
    };

    // mảng hoặc object
    if (Array.isArray(value)) {
        return toUrl(value[0]);
    }
    return toUrl(value);
}

async function prepareBookPayload(data: any): Promise<any> {
    const updated = { ...data };
    const normalized = await normalizeImage(data.cover_image);
    if (typeof normalized !== 'undefined') {
        updated.cover_image = normalized;
    }
    return updated;
}

async function prepareAuthorPayload(data: any): Promise<any> {
    const updated = { ...data };
    const normalized = await normalizeImage(data.profile_image);
    if (typeof normalized !== 'undefined') {
        updated.profile_image = normalized;
    }
    return updated;
}

const dataProvider: DataProvider = {
    ...baseProvider,
    create: async (resource, params) => {
        if (resource === 'books') {
            const data = await prepareBookPayload(params.data);
            return baseProvider.create(resource, { ...params, data });
        }
        if (resource === 'authors') {
            const data = await prepareAuthorPayload(params.data);
            return baseProvider.create(resource, { ...params, data });
        }
        return baseProvider.create(resource, params);
    },
    update: async (resource, params) => {
        if (resource === 'books') {
            const data = await prepareBookPayload(params.data);
            return baseProvider.update(resource, { ...params, data });
        }
        if (resource === 'authors') {
            const data = await prepareAuthorPayload(params.data);
            return baseProvider.update(resource, { ...params, data });
        }
        return baseProvider.update(resource, params);
    },
    // Giữ nguyên các phương thức còn lại
};

export default dataProvider;
