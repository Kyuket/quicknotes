import axios from "axios"

const jwt = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzkwNjA2NjM3LCJpYXQiOjE3OTAwMDY2OTcsImp0aSI6Ijg5ZTAyZjNlMTMwMTRlODJiOWNiNWJhMGQ2Y2Y3ZDcwIiwidXNlcl9pZCI6IjEifQ.0UfTKmIYkjsg7i2AbgwfnsHLdtxUD0x5kNnLL02z0M4"

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${jwt}`,
    },
});


export type Collection = {
    id?: number,
    name: string,
    notes?: Note[]
};

export type Note = {
    id?: number,
    title: string,
    content: string,
    collection?: number | null,
    collection_data?: Collection | null
};

export type User = {
    username: string,
    password: string
};

export type AuthTokens = {
    access: string,
    refresh: string
}

async function getHome(): Promise<string>{
    const res = await api.get<string>('/')
    return res.data;
}

async function login(user: User): Promise<object> {
    const res = await api.post('api/auth/login/', user)
    return res.data;
}

async function getNotes(params?: {
    id?: number
}): Promise<Note[]> {
    const res = await api.get('/api/notes/', { params: {params}})
    return res.data.data;
}

async function createNote(note: Note): Promise<Note> {
    const res = await api.post('/api/notes/', note)
    return res.data;
}

async function updateNote(note: Note, id: number): Promise<Note> {
    const res = await api.put(`/api/notes/${id}/`, note)
    return res.data;
}

async function getNote(id: number): Promise<Note> {
    const res = await api.get(`/api/notes/${id}/`)
    return res.data.data;
}

async function getCollectionWithNotes(id: number): Promise<Collection> {
    const res = await api.get(`/api/collections/${id}/notes/`)
    return res.data.data;
}

async function getCollections(): Promise<Collection[]> {
    const res = await api.get('/api/collections/')
    return res.data.data;
}

async function getCollection(id: number): Promise<Collection> {
    const res = await api.get(`/api/collections/${id}/`)
    return res.data.data;
}


async function createCollection(collection: Collection): Promise<Collection> {
    const res = await api.post('/api/collections/', collection)
    return res.data;
}

async function updateCollection(collection: Collection, id: number): Promise<Collection> {
    const res = await api.put(`/api/collections/${id}/`, collection)
    return res.data;
}

async function deleteCollection(id: number): Promise<void> {
    await api.delete(`/api/collections/${id}/`)
    return;
}

async function deleteNote(id: number): Promise<void> {
    await api.delete(`/api/notes/${id}/`)
    return;
}


export default {
    getHome,
    login,
    getNotes,
    getNote,
    updateNote,
    createNote,
    getCollection,
    getCollections,
    getCollectionWithNotes,
    updateCollection,
    createCollection,
    deleteCollection,
    deleteNote
}
