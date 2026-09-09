// var prompt = require('prompt-sync')();
import {trips} from './data.js';
import promptSync from 'prompt-sync';
var prompt = promptSync();


// const tickets = [
//     {
//         id: 1,
//         passengerName: "hh",
//         tripId: 3,
//         seatNumber: 1,
//         price: 120
//     }
//         ];

const tickets = [];

// Affichage:
function afficherTrajet(arrTrips){

    console.log('\n=== TRAJETS DISPONIBLES ===\n');
    for(let i = 0; i <= arrTrips.length - 1; i++){
        console.log(`#${i+1} ${arrTrips[i].departure} → ${arrTrips[i].destination}\n`);
        console.log(`Départ : ${arrTrips[i].departureTime}\n`);
        console.log(`Arrivée : ${arrTrips[i].arrivalTime}\n`);
        console.log(`Prix: ${arrTrips[i].price}\n`);
        console.log(`Places disponibles : ${arrTrips[i].availableSeats}\n`);
    }
}
    
// 4. Acheter un ticket
let ticketId = 0;
function acheterUnTicket(arrTrips, arrTickets){
    const PassgName = prompt('Veuillez entrer votre nom: ');
    const targetId = Number(prompt('Veuillez entrer l\'identifiant du trajet: '));
    // treat lower and uppercase, and trim
    let tripFound = false;
    for(let trip of arrTrips){
        if(trip.id === targetId){
            tripFound = true;
            // ticketId++;

            if(trip.availableSeats <= 0){
                console.log('Train complet.');
                return;
            }

            const ticket = {
                id: arrTickets.length + 1,
                passengerName: PassgName,
                tripId: trip.id,
                seatNumber: 50 - trip.availableSeats + 1,
                price: trip.price
            }
            trip.availableSeats -= 1;
            arrTickets.push(ticket);
            
            console.log('Ticket acheté avec succès.');
            break;
        }
    }
    if(!tripFound){
        console.log('Trajet non trouvé.');
    }
}

//Afficher les tickets
function afficherLesTickets(arrTickets, arrTrips){
    if(arrTickets.length <= 0){
        console.log('Aucun ticket enregistré.');
        return;
    }

    console.log('\n=== TICKETS ===\n')
    for(const ticket of arrTickets){
        console.log(`Ticket #${ticket.id}`);
        console.log(`Passager : ${ticket.passengerName}`);
        console.log(`Trajet : ${arrTrips[ticket.tripId - 1].departure} → ${arrTrips[ticket.tripId -1 ].destination}`);
        console.log(`Place : ${ticket.seatNumber}`);
        console.log(`Prix : ${ticket.price} DH\n`);
    }
}

// Annuler un ticket
function annulerUnTicket(arrTickets, arrTrips){
    const ticketId = Number(prompt('Veuillez entrer l\'identifiant du ticket: '));

    let ticketFound = false;
    for(let i = 0; i < arrTickets.length; i++){
        if(arrTickets[i].id === ticketId){
            ticketFound = true;

            for(const trip of arrTrips)
                if(trip.id === ticketId)
                    trip.availableSeats +=1;

            arrTickets.splice(i, 1);
            console.log('Ticket annulé avec succès.');
            break;
        }
    }
    if(!ticketFound){
        console.log('Ticket non trouvé.');
    }
}

// Rechercher un ticket
function rechercherUnTicket(arrTickets, arrTrips){
    // treat trim and lower or upper case later
    const PassgName = prompt('Veuillez entrer votre nom: ');

    let foundPassger = false;
    for(const ticket of arrTickets){
        if(ticket.passengerName === PassgName){
            foundPassger = true;
            console.log(`Ticket #${ticket.id}`);
            console.log(`Passager : ${ticket.passengerName}`);
            console.log(`Trajet : ${arrTrips[ticket.tripId - 1].departure} → ${arrTrips[ticket.tripId -1 ].destination}`);
            console.log(`Place : ${ticket.seatNumber}`);
            console.log(`Prix : ${ticket.price} DH`);
        }
    }

    if(!foundPassger){
        console.log(`Passager ${PassgName} n'est pas disponible`);
        return;
    }
}

// Filtrer les trajets
function filtrerLesTrajets(arrTrips){
    // treat trim and lower or upper case later
    const dpartureCity = prompt('Veuillez entrer la ville de départ : ');
    
    for(const trip of arrTrips){
        if(trip.departure === dpartureCity)
            console.log(`${trip.departure} → ${trip.destination} : ${trip.price} DH`);
    }
}

// Trier les trajets
function trierLesTrajets(arrTrips){
    let newArrTrips = [...arrTrips];
    console.log(newArrTrips[0], newArrTrips[length-1])
    let trajets = true;
    while(trajets){
        trajets = false;
        for(let i = 0 ; i < newArrTrips.length; i++){
            if(newArrTrips[i].price > newArrTrips[i+1].price){
                trajets = true;
                let temp = newArrTrips[i];
                newArrTrips[i] = newArrTrips[i+1];
                newArrTrips[i+1] = temp;
            }
        }
    }
    // return afficherTrajet(newArrTrips);
    // console.log(newArrTrips)
}



//Menu:
let menu = true;
while (menu){
    console.log('\n=================================\n');
    console.log(' RAILWAY MANAGER \n');
    console.log('=================================\n');
    console.log('1. Afficher les trajets');
    console.log('2. Acheter un ticket');
    console.log('3. Afficher les tickets');
    console.log('4. Annuler un ticket');
    console.log('5. Rechercher un ticket');
    console.log('6. Filtrer les trajets');
    console.log('7. Trier les trajets');
    console.log('8. Nombre total de tickets vendus');
    console.log('9. Chiffre d\'affaires total');
    console.log('10. Trajet le plus vendu');
    console.log('0. Quitter\n');

    let choice = "";
    choice = prompt('Votre choix : ')

    switch(choice){
        case '1': afficherTrajet(trips); break;
        case '2': acheterUnTicket(trips, tickets); break;
        case '3': afficherLesTickets(tickets, trips); break;
        case '4': annulerUnTicket(tickets, trips); break;
        case '5': rechercherUnTicket(tickets, trips); break;
        case '6': filtrerLesTrajets(trips); break;
        case '7': console.log(trierLesTrajets(trips)); break;
        case '8': nombreTotalTicketVendus(); break;
        case '9': chiffreDaffaireTotal(); break;
        case '10': trajetPlusVendus(); break;
        case '0': menu = false; break;
        default:
            'Choix indisponible, choisir à nouveau: '
    }
}