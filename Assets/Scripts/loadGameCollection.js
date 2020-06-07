function loadCollection(noOfItems, categorie, genre){
    const url = '/api/gameCollection/loadCollection';
    const request = new XMLHttpRequest();

    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';
    request.onload = function(){
       
        if(request.response.success === true){
           // alert('E bine');
        }
    };
    //console.log(categorie);
    request.send(JSON.stringify({
        noOfItems: noOfItems,
        categorie: categorie,
        genre: genre
    }));
};