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
                    if (request.response.numberOfPlayers === 8){
                        loadEightManTournament(request.response.tournament);
                    } else if (request.response.numberOfPlayers === 16){
                        loadSixteenManTournament(request.response.tournament);
                    } else if (request.response.numberOfPlayers === 4){
                        loadFourManTournament(request.response.tournament);
                    }

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

function loadEightManTournament(tournament){
   changeButtons(tournament.owner);
   const bracketDiv = document.createElement("div");
   bracketDiv.classList.add("bracket-container");
   const table = document.createElement("table");
   table.classList.add("brackets");
   for (let i=0;i < 8; i++){
       const tr = document.createElement("tr");
       const th1 = document.createElement("th");
       th1.classList.add("cells");
       th1.rowSpan=1;th1.colSpan=1;
       if (i%2 == 0){
           th1.textContent = tournament.matches[Math.floor(i/2)].participantOne;
       } else {
           th1.textContent = tournament.matches[Math.floor(i/2)].participantTwo;
       }
       tr.appendChild(th1);
       if (i==0 || i==2 || i==4 || i==6){
           const th2 = document.createElement("th");
           th2.classList.add("cellsSecond");
           th2.rowSpan=2;th2.colSpan=1;
           switch(i) {
               case 0:
                   th2.textContent = tournament.matches[4].participantOne;
                   break;
               case 2:
                   th2.textContent = tournament.matches[4].participantTwo;
                   break;
               case 4:
                   th2.textContent = tournament.matches[5].participantOne;
                   break;
               case 6:
                   th2.textContent = tournament.matches[5].participantTwo;
                   break;
               default:
                   break;
           }
           tr.appendChild(th2);
           if (i==0 || i==4){
               const th3 = document.createElement("th");
               th3.classList.add("cellsThird");
               th3.rowSpan=4;th3.colSpan=1;
               switch(i) {
                   case 0:
                       th3.textContent = tournament.matches[6].participantOne;
                       break;
                   case 4:
                       th3.textContent = tournament.matches[6].participantTwo;
                       break;
                   default:
                       break;
               }
               tr.appendChild(th3);
               if (i==0){
                   const th4 = document.createElement("th");
                   th4.classList.add("cellsFourth");
                   th4.rowSpan=8;th4.colSpan=1;
                   th4.textContent = (tournament.matches.winner) ? tournament.matches.winner : "TBD";
                   tr.appendChild(th4);
               }
           }
       }
       table.appendChild(tr);
   }
   bracketDiv.appendChild(table);
   document.getElementById("mainContainer").appendChild(bracketDiv);
}

function loadFourManTournament(tournament){
    changeButtons(tournament.owner);
    const bracketDiv = document.createElement("div");
    bracketDiv.classList.add("bracket-container");
    const table = document.createElement("table");
    table.classList.add("brackets");
    for (let i=0;i < 4; i++){
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.classList.add("cells");
        th1.rowSpan=1;th1.colSpan=1;
        if (i%2 == 0){
            th1.textContent = tournament.matches[Math.floor(i/2)].participantOne;
        } else {
            th1.textContent = tournament.matches[Math.floor(i/2)].participantTwo;
        }
        tr.appendChild(th1);
        if (i==0 || i==2 ){
            const th2 = document.createElement("th");
            th2.classList.add("cellsSecond");
            th2.rowSpan=2;th2.colSpan=1;
            switch(i) {
                case 0:
                    th2.textContent = tournament.matches[2].participantOne;
                    break;
                case 2:
                    th2.textContent = tournament.matches[2].participantTwo;
                    break;
                default:
                    break;
            }
            tr.appendChild(th2);
            if (i==0){
                const th3 = document.createElement("th");
                th3.classList.add("cellsThird");
                th3.rowSpan=4;th3.colSpan=1;
                th3.textContent = (tournament.matches.winner) ? tournament.matches.winner : "TBD";
                tr.appendChild(th3);
            }
        }
        table.appendChild(tr);
    }
    bracketDiv.appendChild(table);
    document.getElementById("mainContainer").appendChild(bracketDiv);
}

function loadSixteenManTournament(tournament){
    changeButtons(tournament.owner);
    const bracketDiv = document.createElement("div");
    bracketDiv.classList.add("bracket-container");
    const table = document.createElement("table");
    table.classList.add("brackets");
    for (let i=0;i < 16; i++){
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.classList.add("cells");
        th1.rowSpan=1;th1.colSpan=1;
        if (i%2 == 0){
            th1.textContent = tournament.matches[Math.floor(i/2)].participantOne;
        } else {
            th1.textContent = tournament.matches[Math.floor(i/2)].participantTwo;
        }
        tr.appendChild(th1);
        if (i==0 || i==2 || i==4 || i==6 ||
            i==8 || i==10 || i==12 || i==14){
            const th2 = document.createElement("th");
            th2.classList.add("cellsSecond");
            th2.rowSpan=2;th2.colSpan=1;
            switch(i) {
                case 0:
                    th2.textContent = tournament.matches[8].participantOne;
                    break;
                case 2:
                    th2.textContent = tournament.matches[8].participantTwo;
                    break;
                case 4:
                    th2.textContent = tournament.matches[9].participantOne;
                    break;
                case 6:
                    th2.textContent = tournament.matches[9].participantTwo;
                    break;
                case 8:
                    th2.textContent = tournament.matches[10].participantOne;
                    break;
                case 10:
                    th2.textContent = tournament.matches[10].participantTwo;
                    break;
                case 12:
                    th2.textContent = tournament.matches[11].participantOne;
                    break;
                case 14:
                    th2.textContent = tournament.matches[11].participantTwo;
                    break;
                default:
                    break;
            }
            tr.appendChild(th2);
            if (i==0 || i==4 || i==8 || i==12){
                const th3 = document.createElement("th");
                th3.classList.add("cellsThird");
                th3.rowSpan=4;th3.colSpan=1;
                switch(i) {
                    case 0:
                        th3.textContent = tournament.matches[12].participantOne;
                        break;
                    case 4:
                        th3.textContent = tournament.matches[12].participantTwo;
                        break;
                    case 8:
                        th3.textContent = tournament.matches[13].participantOne;
                        break;
                    case 12:
                        th3.textContent = tournament.matches[13].participantTwo;
                        break;
                    default:
                        break;
                }
                tr.appendChild(th3);
                if (i==0 || i==8){
                    const th4 = document.createElement("th");
                    th4.classList.add("cellsFourth");
                    th4.rowSpan=8;th4.colSpan=1;
                    switch (i) {
                        case 0:
                            th4.textContent = tournament.matches[14].participantOne;
                            break;
                        case 8:
                            th4.textContent = tournament.matches[14].participantTwo;
                            break;
                        default:
                            break;
                    }
                    tr.appendChild(th4);
                    if (i==0){
                        const th5 = document.createElement("th");
                        th5.classList.add("cellsFifth");
                        th5.rowSpan=16;th5.colSpan=1;
                        th5.textContent = (tournament.matches.winner) ? tournament.matches.winner : "TBD";
                        tr.appendChild(th5);
                    }
                }
            }
        }
        table.appendChild(tr);
    }
    bracketDiv.appendChild(table);
    document.getElementById("mainContainer").appendChild(bracketDiv);
}

function changeButtons(owner){
    const username = (sessionStorage.getItem("user")) ? sessionStorage.getItem("user") : localStorage.getItem("user");
    const buttonContainer = document.getElementById("buttonDiv");
    document.getElementById("Host").remove();
    document.getElementById("Join").remove();
    if (username !== owner) {
        const leaveButton = document.createElement("button");
        leaveButton.textContent = "Leave";
        leaveButton.id = "Leave";
        buttonContainer.appendChild(leaveButton);
    } else {
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.id = "Leave";
        buttonContainer.appendChild(cancelButton);
    }
}

function leaveTournament(){

}


isInTournament();
