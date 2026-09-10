// var prompt = require('prompt-sync')();
import {trips} from './data.js';
import promptSync from 'prompt-sync';
var prompt = promptSync();

const tickets = [
    // {
    //     id: 1,
    //     passengerName: "Ahmed",
    //     tripId: 3,
    //     seatNumber: 1,
    //     price: 90
    // },
    // {
    //     id: 2,
    //     passengerName: "yassine",
    //     tripId: 3,
    //     seatNumber: 2,
    //     price: 90
    // },
    // {
    //     id: 3,
    //     passengerName: "Muad",
    //     tripId: 2,
    //     seatNumber: 1,
    //     price: 90
    // },
];

function clean(name){
    return name.trim().toLowerCase();
}

function capitalize(name){
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// Affichage:
function afficherTrajet(arrTrips){

    console.log('\n=== TRAJETS DISPONIBLES ===\n');
    for(let i = 0; i <= arrTrips.length - 1; i++){
        if(arrTrips[i].availableSeats <= 0)
            continue
        console.log(`#${i+1} ${arrTrips[i].departure} → ${arrTrips[i].destination}\n`);
        console.log(`Départ : ${arrTrips[i].departureTime}\n`);
        console.log(`Arrivée : ${arrTrips[i].arrivalTime}\n`);
        console.log(`Prix: ${arrTrips[i].price} DH\n`);
        console.log(`Places disponibles : ${arrTrips[i].availableSeats}\n`);
        console.log('============================\n');
    }
}

// 4. Acheter un ticket
let ticketId = 1
function acheterUnTicket(arrTrips, arrTickets){
    let PassgName = clean(prompt('Veuillez entrer votre nom: '));
    const targetId = Number(prompt('Veuillez entrer l\'identifiant du trajet: '));

    let tripFound = false;
    for(let i = 0; i < arrTrips.length - 1; i++){
        if(arrTrips[i].id === targetId){
            tripFound = true;

            if(arrTrips[i].availableSeats <= 0){
                console.log('Train complet.');
                return;
            }

            const ticket = {
                id: ticketId++,
                passengerName: PassgName,
                tripId: arrTrips[i].id,
                seatNumber: 50 - arrTrips[i].availableSeats + 1,
                price: arrTrips[i].price
            }

            arrTrips[i].availableSeats -= 1;
            arrTickets.push(ticket);
            
            console.log('Ticket acheté avec succès.');
            break;
        }
    }

    if(!tripFound)
        console.log('Trajet non trouvé.');
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
        console.log(`Passager : ${capitalize(ticket.passengerName)}`);
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
                if(trip.id === arrTickets[i].tripId)
                    trip.availableSeats +=1;

            arrTickets.splice(i, 1);
            console.log('Ticket annulé avec succès.');
            break;
        }
    }

    if(!ticketFound)
        console.log('Ticket non trouvé.');
}

// Rechercher un ticket
function rechercherUnTicket(arrTickets, arrTrips){
    const passgName = clean(prompt('Veuillez entrer le nom de passager: '));

    let foundPassger = false;
    for(let i = 0; i < arrTickets.length; i++){
        if(arrTickets[i].passengerName.toLowerCase() === passgName){
            foundPassger = true;
            console.log(`\nTicket #${arrTickets[i].id}`);
            console.log(`Passager : ${capitalize(arrTickets[i].passengerName)}`);
            console.log(`Trajet : ${arrTrips[arrTickets[i].tripId - 1].departure} → ${arrTrips[arrTickets[i].tripId - 1].destination}`);
            console.log(`Place : ${arrTickets[i].seatNumber}`);
            console.log(`Prix : ${arrTickets[i].price} DH`);
        }
    }

    if(!foundPassger){
        console.log(`\nPassager ${passgName} n'est pas disponible`);
        return;
    }
}

// Filtrer les trajets
function filtrerLesTrajets(arrTrips){
    const dpartureCity = clean(prompt('\nVeuillez entrer la ville de départ : '));
    console.log('\n');
    
    for(const trip of arrTrips){
        if(trip.departure.toLowerCase() === dpartureCity)
            console.log(`${capitalize(trip.departure)} → ${capitalize(trip.destination)} : ${trip.price} DH`);
    }
}

// Trier les trajets
function trierLesTrajets(arrTrips){

    let newArrTrips = [...arrTrips];
    
    for(let i = 0; i < newArrTrips.length; i++){
        for(let j = 0 ; j < newArrTrips.length - i - 1; j++){
            if(newArrTrips[j].price > newArrTrips[j+1].price){
                let temp = newArrTrips[j];
                newArrTrips[j] = newArrTrips[j+1];
                newArrTrips[j+1] = temp;
            }
        }
    }

    return newArrTrips;
}

// affichage tri
function affichageApresTri(sortedArr){
    console.log('\n');
    for(const ticket of sortedArr){
        console.log(`${ticket.departure} → ${ticket.destination}: ${ticket.price} DH`);
    }
}

//Nombre total de tickets vendus
function nombreTotalTicketVendus(arrTickets){
    if(arrTickets.length <= 0)
        return 'Aucun ticket enregistré.';

    let count = 0
    for(const ticket of arrTickets){
        if(ticket.price) 
            count++;
    }

    return count;
}

// Chiffre d'affaires total
function chiffreDaffaireTotal(arrTickets){
    if(arrTickets.length <= 0)
        return 'Aucun ticket enregistré.';

    let sum = 0;

    for(const ticket of arrTickets){
        sum += ticket.price;
    }
    
    return sum;
}

//Trajet le plus vendu
function trajetPlusVendus(arrTickets, arrTrips){
    if(arrTickets.length <= 0)
        return 'Aucun ticket enregistré.'

    let minSeatDispo = arrTrips[0];
    for(let i = 0; i < arrTickets.length; i++){
        if(arrTrips.id === arrTickets.tripId)
            if(arrTrips[i].availableSeats < minSeatDispo.availableSeats)
                minSeatDispo = arrTrips[i];
    }

    console.log(`\n${minSeatDispo.departure} → ${minSeatDispo.destination}\n`)
    return 50 - minSeatDispo.availableSeats;;
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
    choice = prompt('Votre choix de 1 a 10 ou 0 pour sortir : ')

    switch(choice){
        case '1': afficherTrajet(trips); break;
        case '2': acheterUnTicket(trips, tickets); break;
        case '3': afficherLesTickets(tickets, trips); break;
        case '4': annulerUnTicket(tickets, trips); break;
        case '5': rechercherUnTicket(tickets, trips); break;
        case '6': filtrerLesTrajets(trips); break;
        case '7': affichageApresTri(trierLesTrajets(trips)); break;
        case '8': console.log("\nNombre total de tickets :", nombreTotalTicketVendus(tickets)); break;
        case '9': console.log(`\nChiffre d'affaires total : ${chiffreDaffaireTotal(tickets)} DH`); break;
        case '10': console.log(`${trajetPlusVendus(tickets, trips)} tickets vendus`); break;
        case '0': menu = false; break;
        default:
            console.log('Choix indisponible, choisir à nouveau: ');
    }
}