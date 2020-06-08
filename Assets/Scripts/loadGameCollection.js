let pageGlobal = 1;

function loadCollection(noOfItems, categorie, genre, switcher, page){
    const url = '/api/gameCollection/loadCollection';
    const request = new XMLHttpRequest();

    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';
    
    request.onload = function(){
        if(document.getElementById("displayedList")){
            document.getElementById("displayedList").remove();
        }

        if(document.getElementById("titlesList")){
            document.getElementById("titlesList").remove();
        }

        if(document.getElementById("pageNav")){
            document.getElementById("pageNav").remove();
        }

        sessionStorage.setItem("numberOfGames", request.response.totalNoOfGames);
        sessionStorage.setItem("lastGenrePressed", genre);
        sessionStorage.setItem("lastCategoriePressed", categorie);
        
        const container = document.getElementById("gamesMainContainer");
        
        const titlesList = document.createElement("div");
        titlesList.id = "titlesList";
        titlesList.classList.add("titles-grid");
        
        const colNames = document.createElement("ul");
        colNames.classList.add("column-names");
        
        const col1 = document.createElement("li");
        col1.classList.add("column-names-li");
        col1.textContent = "Name";
        
        const col2 = document.createElement("li");
        col2.classList.add("column-names-li");
        col2.textContent = "Company";
        
        const col3 = document.createElement("li");
        col3.classList.add("column-names-li");
        col3.textContent = "Popularity";

        const col4 = document.createElement("li");
        col4.classList.add("column-names-li");
        col4.textContent = "Platform";

        const col5 = document.createElement("li");
        col5.classList.add("column-names-li");
        col5.textContent = "Genre"

        const col6 = document.createElement("li");
        col6.classList.add("column-names-li");
        col6.textContent = "Price"

        colNames.appendChild(col1);
        colNames.appendChild(col2);
        colNames.appendChild(col3);
        colNames.appendChild(col4);
        colNames.appendChild(col5);
        colNames.appendChild(col6);
        titlesList.appendChild(colNames);

        const games = request.response.games;
        
        const displayedList = document.createElement("ul");
        displayedList.id="displayedList";
        displayedList.classList.add("displayed-games");
    
       for(let i = 0; i < games.length; i++){
            const item = document.createElement("li");
            item.classList.add("grid-item");
            
            const gameName = document.createElement("span");
            gameName.classList.add("grid-item-title");
            gameName.textContent = games[i].name;
            
            const gameCompany = document.createElement("span");
            gameCompany.classList.add("grid-item-title");
            gameCompany.textContent = games[i].company;

            const gamePopularity = document.createElement("span");
            gamePopularity.classList.add("grid-item-title");
            gamePopularity.textContent = games[i].popularity;

            const gamePlatform = document.createElement("span");
            gamePlatform.classList.add("grid-item-title");
            gamePlatform.textContent = games[i].platform;

            const gameGenre = document.createElement("span");
            gameGenre.classList.add("grid-item-title");
            gameGenre.textContent = games[i].genre;

            const gamePrice = document.createElement("span");
            gamePrice.classList.add("grid-item-title");
            gamePrice.textContent = games[i].price;
            
            const button = document.createElement("button");
            button.classList.add("particular-button");
            button.textContent = "View";
            button.addEventListener("click",function(event){
                event.preventDefault();
                //revenim pentru view
            });

            item.appendChild(gameName);
            item.appendChild(gameCompany);
            item.appendChild(gamePopularity);
            item.appendChild(gamePlatform);
            item.appendChild(gameGenre);
            item.appendChild(gamePrice);

            displayedList.appendChild(item);
        }
        container.appendChild(titlesList);
        container.appendChild(displayedList);
        //alegerea paginii, in partea de jos
        pageGlobal = page;

        const pageNav = document.getElementById("pageNav");
        pageNav.classList.add("page-nav");
        
        const labelNav = document.createElement("label");
        labelNav.textContent = "Page:";

        pageNav.appendChild(labelNav);
        
        if(page > 1){
            const buttonPrev = document.createElement("button");
            buttonPrev.textContent = "Prev";
            buttonPrev.addEventListener("click", function(){
               loadCollection(noOfItems, categorie, genre, switcher, page-1);
            });
            pageNav.appendChild(buttonPrev);
        }

        const currentPageLabel = document.createElement("label");
        currentPageLabel.textContent = page;
        pageNav.appendChild(currentPageLabel);

        if(page * noOfItems < sessionStorage.getItem("numberOfGames")){
            const buttonNext = document.createElement("button");
            buttonNext.textContent = "Next";
            buttonNext.addEventListener("click", function(){
                loadCollection(noOfItems,categorie,genre,switcher,page+1);
            });
            pageNav.appendChild(buttonNext);
        } 
        container.appendChild(pageNav);
    };
    
    request.send(JSON.stringify({
        noOfItems: noOfItems,
        categorie: categorie,
        genre: genre,
        switcher: switcher,
        page: page
    }));
}


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

const popularityButton = document.getElementById("popularityButton");
popularityButton.addEventListener("click", function (event){
    event.preventDefault();
    loadCollection(10, sessionStorage.getItem("lastCategoriePressed"), sessionStorage.getItem("lastGenrePressed"), 1, 1); //default switcher 0 pentru popularity
})

const alphabetButton = document.getElementById("alphabeticallyButton");
alphabetButton.addEventListener("click", function(event){
    event.preventDefault();
    loadCollection(10, sessionStorage.getItem("lastCategoriePressed"), sessionStorage.getItem("lastGenrePressed"), 2, 1); //switcher 2 pentru alphabetically
});

const dateButton = document.getElementById("dateButton");
dateButton.addEventListener("click", function(event){
    event.preventDefault();
    loadCollection(10, sessionStorage.getItem("lastCategoriePressed"), sessionStorage.getItem("lastGenrePressed"), 3, 1); //switcher 3 pentru date
});

/* const ageButton = document.getElementById("ageButton");
ageButton.addEventListener("click", function(event){
    event.preventDefault();
    loadCollection(10, 'digital', 'action', 4, 1); //switcher 4 pentru age
}); */

const priceButton = document.getElementById("priceButton");
priceButton.addEventListener("click", function(event){
    event.preventDefault();
    loadCollection(10, sessionStorage.getItem("lastCategoriePressed"), sessionStorage.getItem("lastGenrePressed"), 5, 1); //switcher 5 pentru price
});


loadCollection(10, 'digital', 'action', 0, 1);