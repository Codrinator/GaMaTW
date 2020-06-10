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
    };
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
   changeButtons(tournament.owner,tournament.name);
   const username = (sessionStorage.getItem("user")) ? sessionStorage.getItem("user") : localStorage.getItem("user");
   const bracketDiv = document.createElement("div");
   bracketDiv.classList.add("bracket-container");
   const table = document.createElement("table");
   table.classList.add("brackets");
   let index1 = 0;
   let index2 = 4;
   for (let i=0;i < 8; i++){
       const tr = document.createElement("tr");
       const th1 = document.createElement("th");
       th1.classList.add("cells");
       th1.rowSpan=1;th1.colSpan=1;
       if (i%2 == 0){
           index1++;
           th1.textContent = tournament.matches[Math.floor(i/2)].participantOne;
       } else {
           th1.textContent = tournament.matches[Math.floor(i/2)].participantTwo;
       }
       th1.classList.add("match"+index1);
       if (tournament.state  && tournament.owner === username){
           th1.addEventListener("click" ,function () {
               cellClick(this,tournament);
           });
       }
       tr.appendChild(th1);
       if (i==0 || i==2 || i==4 || i==6){
           const th2 = document.createElement("th");
           th2.classList.add("cellsSecond");
           th2.rowSpan=2;th2.colSpan=1;
           if (tournament.state  && tournament.owner === username){
               th2.addEventListener("click" ,function () {
                   cellClick(this,tournament);
               });
           }
           if (i%4 == 0) index2++;
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
           th2.classList.add("match"+index2);
           tr.appendChild(th2);
           if (i==0 || i==4){
               const th3 = document.createElement("th");
               th3.classList.add("cellsThird");
               th3.classList.add("match7");
               if (tournament.state  && tournament.owner === username){
                   th3.addEventListener("click" ,function () {
                       cellClick(this,tournament);
                   });
               }
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
                   th4.textContent = tournament.winner;
                   if (tournament.winner !== "TBD"){
                       th4.classList.add("winner");
                   }
               }
           }
       }
       table.appendChild(tr);
   }
   bracketDiv.appendChild(table);
   document.getElementById("mainContainer").appendChild(bracketDiv);
   addColors(tournament);
}

function loadFourManTournament(tournament){
    changeButtons(tournament.owner,tournament.name);
    const username = (sessionStorage.getItem("user")) ? sessionStorage.getItem("user") : localStorage.getItem("user");
    const bracketDiv = document.createElement("div");
    bracketDiv.classList.add("bracket-container");
    const table = document.createElement("table");
    table.classList.add("brackets");
    let index1 = 0;
    for (let i=0;i < 4; i++){
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.classList.add("cells");
        th1.rowSpan=1;th1.colSpan=1;
        if (tournament.state && tournament.owner === username){
            th1.addEventListener("click" ,function () {
                cellClick(this,tournament);
            });
        }
        if (i%2 == 0){
            index1++;
            th1.textContent = tournament.matches[Math.floor(i/2)].participantOne;
        } else {
            th1.textContent = tournament.matches[Math.floor(i / 2)].participantTwo;
        }
        th1.classList.add("match"+index1);
        tr.appendChild(th1);
        if (i==0 || i==2 ){
            const th2 = document.createElement("th");
            th2.classList.add("cellsSecond");
            th2.classList.add("match3");
            if (tournament.state  && tournament.owner === username){
                th2.addEventListener("click" ,function () {
                    cellClick(this,tournament);
                });
            }
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
                th3.textContent = tournament.winner;
                if (tournament.winner !== "TBD"){
                    th3.classList.add("winner");
                }
                tr.appendChild(th3);
            }
        }
        table.appendChild(tr);
    }
    bracketDiv.appendChild(table);
    document.getElementById("mainContainer").appendChild(bracketDiv);
    addColors(tournament);
}

function loadSixteenManTournament(tournament){
    const username = (sessionStorage.getItem("user")) ? sessionStorage.getItem("user") : localStorage.getItem("user");
    changeButtons(tournament.owner,tournament.name);
    const bracketDiv = document.createElement("div");
    bracketDiv.classList.add("bracket-container");
    const table = document.createElement("table");
    table.classList.add("brackets");
    let index1 = 0;
    let index2 = 8;
    let index3 = 12;
    for (let i=0;i < 16; i++){
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.classList.add("cells");
        th1.rowSpan=1;th1.colSpan=1;
        if (tournament.state && tournament.owner === username){
            th1.addEventListener("click" ,function () {
                cellClick(this,tournament);
            });
        }
        if (i%2 == 0){
            index1++;
            th1.textContent = tournament.matches[Math.floor(i/2)].participantOne;
        } else {
            th1.textContent = tournament.matches[Math.floor(i/2)].participantTwo;
        }
        th1.classList.add("match"+index1);
        tr.appendChild(th1);
        if (i==0 || i==2 || i==4 || i==6 ||
            i==8 || i==10 || i==12 || i==14){
            if (i%4 == 0) index2++;
            const th2 = document.createElement("th");
            th2.classList.add("cellsSecond");
            th2.classList.add("match"+index2);
            th2.rowSpan=2;th2.colSpan=1;
            if (tournament.state && tournament.owner === username){
                th2.addEventListener("click" ,function () {
                    cellClick(this,tournament);
                });
            }
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
                if (i%8 == 0) index3++;
                th3.classList.add("match"+index3);
                if (tournament.state && tournament.owner === username){
                    th3.addEventListener("click" ,function () {
                        cellClick(this,tournament);
                    });
                }
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
                    th4.classList.add("match15");
                    if (tournament.state && tournament.owner === username){
                        th4.addEventListener("click" ,function () {
                            cellClick(this,tournament);
                        });
                    }
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
                        th5.textContent = tournament.winner;
                        if (tournament.winner !== "TBD"){
                            th5.classList.add("winner");
                        }
                        tr.appendChild(th5);
                    }
                }
            }
        }
        table.appendChild(tr);
    }
    bracketDiv.appendChild(table);
    document.getElementById("mainContainer").appendChild(bracketDiv);
    addColors(tournament);
}

function changeButtons(owner,name){
    const username = (sessionStorage.getItem("user")) ? sessionStorage.getItem("user") : localStorage.getItem("user");
    const buttonContainer = document.getElementById("buttonDiv");
    document.getElementById("Host").remove();
    document.getElementById("Join").remove();
    const titleLabel = document.createElement("p");
    titleLabel.textContent = name.toUpperCase();
    titleLabel.classList.add("titleLabel");
    const ownerLabel = document.createElement("p");
    ownerLabel.textContent = "Hosted By "+owner;
    ownerLabel.classList.add("ownerLabel");
    buttonContainer.appendChild(titleLabel);
    buttonContainer.appendChild(ownerLabel);
    if (username !== owner) {
        const leaveButton = document.createElement("button");
        leaveButton.textContent = "Leave";
        leaveButton.id = "Leave";
        leaveButton.addEventListener("click" , function () {
            leaveTournament(false,name);
        });
        buttonContainer.appendChild(leaveButton);
    } else {
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.id = "Leave";
        cancelButton.addEventListener("click" , function () {
            leaveTournament(true,name);
        });
        buttonContainer.appendChild(cancelButton);
    }
}

function leaveTournament(isOwner,tournamentName){
    const url = '/api/tournaments/leaveTournament';
    const request = new XMLHttpRequest();
    request.open('POST', url);
    const token = (sessionStorage.getItem("token")) ? sessionStorage.getItem("token") : localStorage.getItem("token");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.responseType = 'json';
    request.onload = function(){
        if (!request.response.success) alert(request.response.status);
        else location.reload();
    };
    request.send(JSON.stringify({
        isOwner: isOwner,
        tournamentName: tournamentName
    }));
}

function loadHostForm(){
    if (sessionStorage.getItem("isLogged") === "true" || localStorage.getItem("isLogged") === "true"){
        const buttonsDiv = document.getElementById("buttonDiv");
        while(buttonsDiv.nextSibling){
            buttonsDiv.nextSibling.remove();
        }
        const formWrap = document.createElement("div");
        formWrap.classList.add("formWrapper");
        const formDiv = document.createElement("div");
        formDiv.classList.add("form");
        const form = document.createElement("form");
        form.classList.add("registerForm");
        form.id = "createTournamentForm";
        const p1 = document.createElement("p");
        p1.classList.add("formTextTitle");
        p1.textContent = "Create a Tournament";
        form.appendChild(p1);

        const p2 = document.createElement("p");
        p2.classList.add("pInputBox1");
        const label1 = document.createElement("label");
        label1.classList.add("formText");
        label1.setAttribute("for","nameRegister");
        label1.textContent = "Tournament's name";
        p2.appendChild(label1);
        const br1 = document.createElement("br");
        form.appendChild(p2);form.appendChild(br1);

        const p3 = document.createElement("p");
        p3.classList.add("pInputBox2");
        const input1 = document.createElement("input");
        input1.classList.add("inputBox");
        input1.type="text";input1.id="nameRegister";input1.name="nameRegister";
        p3.appendChild(input1);
        const br2 = document.createElement("br");
        form.appendChild(p3);
        form.appendChild(br2);

        const p4 = document.createElement("p");
        p4.classList.add("pInputBox1");
        const label2 = document.createElement("label");
        label2.classList.add("formText");
        label2.setAttribute("for","gameRegister");
        label2.textContent = "Game's name";
        p4.appendChild(label2);
        const br3 = document.createElement("br");
        form.appendChild(p4);form.appendChild(br3);

        const p5 = document.createElement("p");
        p5.classList.add("pInputBox2");
        const input2 = document.createElement("input");
        input2.classList.add("inputBox");
        input2.type="text";input2.id="gameRegister";input2.name="gameRegister";
        p5.appendChild(input2);
        const br4 = document.createElement("br");
        form.appendChild(p5);
        form.appendChild(br4);

        const p6 = document.createElement("p");
        p6.classList.add("pInputBox1");
        const label3 = document.createElement("label");
        label3.classList.add("formText");
        label3.setAttribute("for","gameRegister");
        label3.textContent = "Choose number of participants";
        p6.appendChild(label3);
        const br5 = document.createElement("br");
        form.appendChild(p6);form.appendChild(br5);

        const div1 = document.createElement("div");
        const radioLabel1 = document.createElement("label");
        radioLabel1.classList.add("radio-inline");
        const radioInput1 = document.createElement("input");
        radioInput1.classList.add("radioButton");
        radioInput1.type = "radio";radioInput1.name = "optradio"; radioInput1.checked=true;
        radioLabel1.textContent = "16";
        radioInput1.id = "radio1";
        radioLabel1.appendChild(radioInput1);

        const radioLabel2 = document.createElement("label");
        radioLabel2.classList.add("radio-inline");
        const radioInput2 = document.createElement("input");
        radioInput2.classList.add("radioButton");
        radioInput2.type = "radio";radioInput2.name = "optradio"; radioInput2.checked=false;
        radioLabel2.textContent = "8";
        radioInput2.id = "radio2";
        radioLabel2.appendChild(radioInput2);

        const radioLabel3 = document.createElement("label");
        radioLabel3.classList.add("radio-inline");
        const radioInput3 = document.createElement("input");
        radioInput3.classList.add("radioButton");
        radioInput3.type = "radio";radioInput3.name = "optradio"; radioInput3.checked=false;
        radioLabel3.textContent = "4";
        radioInput3.id = "radio3";
        radioLabel3.appendChild(radioInput3);

        div1.appendChild(radioLabel1);
        div1.appendChild(radioLabel2);
        div1.appendChild(radioLabel3);
        form.appendChild(div1);
        const br7 = document.createElement("br");
        form.appendChild(br7);

        const inputSubmit = document.createElement("input");
        inputSubmit.type = "submit";
        inputSubmit.value = "Create";
        inputSubmit.classList.add("submitButton");

        form.appendChild(inputSubmit);
        const br6 = document.createElement("br");
        form.appendChild(br6);

        form.addEventListener("submit",function (event) {
            event.preventDefault();
            createTournament();
        });
        formDiv.appendChild(form);
        const div2 = document.createElement("div");
        div2.classList.add("create");
        const anchor = document.createElement("a");
        anchor.classList.add("already");
        const b = document.createElement("b");
        anchor.appendChild(b);
        div2.appendChild(anchor);
        formDiv.appendChild(div2);
        formWrap.appendChild(formDiv);
        document.getElementById("mainContainer").appendChild(formWrap);
    } else {
        alert("Login or Register to use this feature");
    }
}

function createTournament(){
    const form = document.getElementById("createTournamentForm");
    const formData = new FormData(form);

    const url = '/api/tournaments/createTournament';
    const request = new XMLHttpRequest();
    request.open('POST', url);
    const token = (sessionStorage.getItem("token")) ? sessionStorage.getItem("token") : localStorage.getItem("token");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.responseType = 'json';
    request.onload = function (){
        if (!request.response.success) alert(request.response.status);
        else location.reload();
    }
    const radioButtonInput = (document.getElementById("radio1").checked) ? 16 :
        ((document.getElementById("radio2").checked) ? 8 : 4);
    request.send(JSON.stringify({
        name: formData.get("nameRegister"),
        max_number_participants: radioButtonInput,
        game: formData.get("gameRegister")
    }));
}

function cellClick(cell,tournament){
    const match = cell.classList[1].split("match")[1]-1;
    const matchPair = document.getElementsByClassName(cell.classList[1]);
    const nextMatch = getNextMatch(match+1,tournament.max_number_participants)-1;
    if (matchPair[0].textContent !== "TBD" && matchPair[1].textContent !== "TBD"){
        const participant = (match%2 == 0) ? "one" : "two";
        const url = '/api/tournaments/declareMatchWinner';
        const request = new XMLHttpRequest();
        request.open('POST', url);
        const token = (sessionStorage.getItem("token")) ? sessionStorage.getItem("token") : localStorage.getItem("token");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("Authorization", "Bearer "+token);
        request.responseType = 'json';
        request.onload = function (){
            if (!request.response.success) alert(request.response.status);
            else location.reload();
        }
        request.send(JSON.stringify({
            tournament: tournament.name,
            currentMatch: match,
            participant: participant,
            username: cell.textContent,
            nextMatch: nextMatch
        }));
    }
}

function addColors(tournament){
    for (let i = 0; i < tournament.match_winner.length; i++){
        const matchString = "match"+(i+1);
        const matchPair = document.getElementsByClassName(matchString);
        if (matchPair[0].textContent === tournament.match_winner[i]){
            matchPair[0].classList.add("winner");
            matchPair[1].classList.add("loser");
        } else if (matchPair[1].textContent === tournament.match_winner[i]){
            matchPair[1].classList.add("winner");
            matchPair[0].classList.add("loser");
        }
    }
}

function getNextMatch(match,nrOfPlayer) {
    if(nrOfPlayer === 4){
        if (match === 1 || match === 2) return 3;
        return 0;
    } else if (nrOfPlayer === 8){
        if (match === 1 || match === 2) return 5;
        if (match === 3 || match === 4) return 6;
        if (match === 5 || match === 6) return 7;
        return 0;
    } else if (nrOfPlayer === 16){
        if (match === 1 || match === 2) return 9;
        if (match === 3 || match === 4) return 10;
        if (match === 5 || match === 6) return 11;
        if (match === 7 || match === 8) return 12;
        if (match === 9 || match === 10) return 13;
        if (match === 11 || match === 12) return 14;
        if (match === 13 || match === 14) return 15;
        return 0;
    }
}

isInTournament();
