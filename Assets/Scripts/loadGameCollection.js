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

function downloadPDF() {
    const url = 'api/gameCollection/downloadStatistic';
    const request = new XMLHttpRequest();

    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';
    request.onload = function () {
        if (request.response.success === true) {
            let doc = new jsPDF();
            doc.setFont('arial', 'bold');
            doc.text('GAMMA statistics', 80, 10);
            doc.setFont('arial', 'none');
            doc.text('Our collection contains ' + request.response.numberOfGames + ' games!', 10, 20);
            doc.text('We have ' + request.response.numberOfUsers + ' users registered!', 10, 30);
            doc.text('Top 10 games from our collection:', 10, 50);
            let index = 50;
            let place = 0;
            request.response.topGames.forEach(function (item) {
                index = index + 10;
                place = place + 1;
                doc.setFont('times', 'none');
                doc.text(place + '. ' + item.name + ' made by ' + item.company, 10, index);
            });
            index = index + 20;
            place = 0;
            doc.setFont('arial', 'none');
            doc.text('Newest 5 games in our collection:', 10, index);

            request.response.newGames.forEach(function (item) {
                index = index + 10;
                place = place + 1;
                doc.setFont('times', 'none');
                doc.text(place + '. ' + item.name + ' made by ' + item.company, 10, index);
            });
            doc.save('GAMMA_Statistics_PDF.pdf');

        }
    };

    request.send();
}

function downloadCSV() {
    const url = 'api/gameCollection/downloadCSV';
    const request = new XMLHttpRequest();

    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';

    request.onload = function () {

        if (request.response.success === true) {
            let info = 'name,company,popularity,category,age_restriction,price,release_date'+'\n';
        let date;
            request.response.allGames.forEach(function (item) {

                if(item.release_date=== 'undefined' || item.release_date===null)
                     date = 'Unknown';
                else
                    date=item.release_date.toLocaleString();

                info = info + (item.name + ',' + item.company+ ',' + item.popularity
                    + ',' + item.category+ ',' + item.age_restriction+ ',' + item.price
                    + ',' + date) + '\n';

            });
            info = info + '\n';
            info = info + 'name,owner,number_participants,state,created_at'+'\n';
            request.response.allTournaments.forEach(function (item) {
                if(item.created_at===undefined || item.created_at===null)
                    date = 'Unknown';
                else
                    date=item.created_at.toLocaleString();
                info = info + (item.name + ',' + item.company + ',' + item.max_number_participants +
                        ',' + item.state + ',' + date) + '\n';
            });

            const blob = new Blob([info], {type: 'test/csv'});
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', urlBlob);
            a.setAttribute('download', 'GAMMA_Statistics_CSV.csv');
            document.body.appendChild(a);
            a.click();
            document.body.remove();
            window.location.href = "/gameCollection";
        }
    };
    request.send();
}
