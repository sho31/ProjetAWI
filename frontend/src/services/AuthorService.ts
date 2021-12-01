import http from "../http-common";
import AuthorData from "../types/Author";

const getAllAuthors = async () => {
    const tmp = await http.get<Array<AuthorData>>("/author/all");
    return tmp.data;
};

const get = (id: any) => {
    return http.get<AuthorData>(`/${id}`);
};

const create = (data: AuthorData) => {
    return http.post<AuthorData>("/tutorials", data);
};

const update = (id: any, data: AuthorData) => {
    return http.put<any>(`/tutorials/${id}`, data);
};

const remove = (id: any) => {
    return http.delete<any>(`/tutorials/${id}`);
};

const removeAll = () => {
    return http.delete<any>(`/tutorials`);
};

const findByTitle = (title: string) => {
    return http.get<Array<AuthorData>>(`/tutorials?title=${title}`);
};

const TutorialService = {
    getAllAuthors,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
};

export default TutorialService;
