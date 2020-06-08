let pageGlobal = 1;

function getTournamentPage(page,pageSize){
    const url = '/api/tournaments/getPage';
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';
    const buttonsDiv = document.getElementById("buttonDiv");
    while(buttonsDiv.nextSibling){
        buttonsDiv.nextSibling.remove();
    }
    request.onload = function () {
        sessionStorage.setItem("numberOfTournaments",request.response.activeTournaments);
        const tournaments = request.response.tournaments;

        const container = document.getElementById("mainContainer");
        const tournamentList = document.createElement("div");
        tournamentList.classList.add("tournament-list");
        const colNames = document.createElement("ol");
        colNames.classList.add("column-names");
        const col1 = document.createElement("li");
        col1.classList.add("column-names-li");
        col1.textContent = "Tournament Name";
        const col2 = document.createElement("li");
        col2.classList.add("column-names-li");
        col2.textContent = "Game";
        const col3 = document.createElement("li");
        col3.classList.add("column-names-li");
        col3.textContent = "Nr. of players";
        col3.id = "last"
        colNames.appendChild(col1);
        colNames.appendChild(col2);
        colNames.appendChild(col3);
        tournamentList.appendChild(colNames);

        const displayedList = document.createElement("ol");
        displayedList.classList.add("displayed-tournaments");
        for (let i=0 ; i<tournaments.length ; i++){
            const item = document.createElement("li");
            item.classList.add("tournament-item");
            const title = document.createElement("span");
            title.classList.add("tournament-title");
            title.textContent = tournaments[i].tournamentName;
            const game = document.createElement("span");
            game.classList.add("tournament-game");
            game.textContent = tournaments[i].game;
            const players = document.createElement("span");
            players.textContent = tournaments[i].participants;
            players.classList.add("tournament-players")
            const button = document.createElement("button");
            button.classList.add("join-button");
            button.textContent = "JOIN";
            button.addEventListener("click",function (event) {
                event.preventDefault();
                const tName = this.previousSibling.previousSibling.previousSibling.textContent;
                joinTournament(tName);
            });
            item.appendChild(title);
            item.appendChild(game);
            item.appendChild(players);
            item.appendChild(button);
            displayedList.appendChild(item);
        }
        tournamentList.appendChild(displayedList);
        pageGlobal = page;

        const pageNav = document.createElement("div");
        pageNav.classList.add("page-nav");
        const label = document.createElement("label");
        label.textContent = "Page:";
        pageNav.appendChild(label);
        if (page > 1){
            const buttonPrev = document.createElement("button");
            buttonPrev.textContent = "Prev";
            buttonPrev.addEventListener("click", function () {
                getTournamentPage(page-1,10);
            });
            pageNav.appendChild(buttonPrev);
        }
        const currentPageLabel = document.createElement("label");
        currentPageLabel.textContent = page;
        pageNav.appendChild(currentPageLabel);
        if (page*pageSize < sessionStorage.getItem("numberOfTournaments")){
            const buttonNext = document.createElement("button");
            buttonNext.textContent = "Next";
            buttonNext.addEventListener("click", function () {
                getTournamentPage(page+1,10);
            });
            pageNav.appendChild(buttonNext);
        }
        tournamentList.appendChild(pageNav);
        container.appendChild(tournamentList);
    };
    request.send(JSON.stringify({
        page: page,
        pageSize: pageSize
    }));
}

function joinTournament(tName){
    const url = '/api/tournaments/join';
    const request = new XMLHttpRequest();
    request.open('POST', url);
    const token = (sessionStorage.getItem("token")) ? sessionStorage.getItem("token") : localStorage.getItem("token");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.responseType = 'json';
    request.onload = function(){
        if (!request.response.success) alert(request.response.status);
        else location.reload();
    }
    request.send(JSON.stringify({
        tournament: tName
    }));
}

function isInTournament(){
    if (sessionStorage.getItem("isLogged") || localStorage.getItem("isLogged")){
        const url = '/api/tournaments/isInTournament';
        const request = new XMLHttpRequest();
        request.open('GET', url);
        const token = (sessionStorage.getItem("token")) ? sessionStorage.getItem("token") : localStorage.getItem("token");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("Authorization", "Bearer "+token);
        request.responseType = 'json';
        request.onload = function(){
            if (request.response.success){
                if (request.response.isInTour){
                    alert("sanky");
                } else {
                    getTournamentPage(pageGlobal,10);
                }
            }
        }
        request.send();
    } else {
        getTournamentPage(pageGlobal,10);
    }
}


isInTournament();
