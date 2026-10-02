import SDK, { type Note, type User, type Collection } from "./api.ts"

try{
    const user: User = {
        username: "neko",
        password: "neko"
    }
    const note: Note = {
        title: "This note should be in a collection",
        content: "Yeah.. lets hope so",
    }
     const collection: Collection = {
        name: "This is a collection's name!"
    }
    
    console.log(await SDK.getCollectionWithNotes(1))
    // console.log(await SDK.updateNote(note, 2))




} catch (err) {
    if (err instanceof Error){
        console.log(err.message)
    }
    else {
        console.log("Something went wrong")
    }
}