import { useEffect, useState } from "react";
import SDK, { type Note, type Collection } from "./sdk/api";
import CreatableSelect from "react-select/creatable";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  const collectionOptions = collections.map((collection) => ({
    value: collection.id,
    label: collection.name,
  }));

  useEffect(() => {
    async function getNotes() {
      try {
        const data = await SDK.getNotes();
        setNotes(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("Something went wrong");
        }
      }
    }

    async function getCollections() {
      try {
        const data = await SDK.getCollections();
        setCollections(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("Something went wrong");
        }
      }
    }

    getNotes();
    getCollections();
  }, []);

  return (
    <div>
      <CreatableSelect onCreateOption={(name) => {console.log("Making", name)}} options={collectionOptions} />
      <table border={2} cellPadding={6}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>

        <tbody>
          {notes.map((note: Note) => {
            return (
              <tr key={note.id}>
                <td>{note.id}</td>
                <td>{note.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
