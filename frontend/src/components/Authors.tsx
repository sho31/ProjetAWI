import React, { useState, useEffect} from "react";
import AuthorDataService from "../services/AuthorService";
import ITutorialData from '../types/Author';

const TutorialsList: React.FC = () => {
    const [authors, setAuthors] = useState<Array<ITutorialData>>([]);

    const retrieveTutorials = async () => {
        await AuthorDataService.getAllAuthors()
            .then((response: any) => {
                setAuthors(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveTutorials();
    }, []);

    return (
        <div>
            <div>
                <h4>Liste des auteurs</h4>
                <ul>
                    {authors &&
                    authors.map((author) => (
                        <li>{author.nomauteur} {author.prenomauteur}</li>))}
                </ul>
            </div>
        </div>
    );
};

export default TutorialsList;
