function loadCollection(){
    const url = '/api/gameCollection/loadCollection';
    const request = new XMLHttpRequest();

    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';
    request.onload = function(){
        if(request.response.success === true){
            alert(request.response.games);
        }
    };

    request.send(JSON.stringify({
        no_of_items: 10,
        criteria: 'popularity'
    }));
};