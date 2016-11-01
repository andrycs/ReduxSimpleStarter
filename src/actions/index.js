export function selectBook(book) {
    // console.log(book.title);

    //selectBook is an ActonCreator, it needs to return an action, an object with a type property
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
}
