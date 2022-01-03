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
    return http.post<AuthorData>("/author", data);
};

const remove = (id: any) => {
    console.log(id)
    return http.delete<any>(`/author?id=${id}`);
};

const TutorialService = {
    getAllAuthors,
    get,
    create,
    remove,
};

export default TutorialService;
