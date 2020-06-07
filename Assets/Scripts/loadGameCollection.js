
function loadCollection(noOfItems, categorie, genre, switcher = 0){
    const url = '/api/gameCollection/loadCollection';
    const request = new XMLHttpRequest();

    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'text';
    DOMParser2 = new DOMParser();
    request.onload = function(){

        document = DOMParser2.parseFromString(request.response,'text/html');
        document.write(request.response);
    };
    
    request.send(JSON.stringify({
        noOfItems: noOfItems,
        categorie: categorie,
        genre: genre,
        switcher: switcher
    }));
};