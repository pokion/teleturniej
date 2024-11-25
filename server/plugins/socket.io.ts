import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import getUserById from "../utils/getUserById";
let players = [];
let firstClickPlayer = null;

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on("connection", (socket) => {
    socket.on('nextQuestion', (msg)=>{
      console.log(players)
      io.emit('nextQuestion', msg)
    });
    socket.on('prevQuestion', ()=>{
      io.emit('prevQuestion')
    })

    socket.on('userCreated', async (userID)=>{
      const playerObject = await getUserById(userID);
      let body = {
        playerObject: playerObject,
        playerID: playerObject.ID,
        password: String(Math.floor(1000 + Math.random() * 9000)),
        points: 0
      }
      players.push(body)
      io.emit('userToAdd', body)
      io.emit('userToAddAdmin', body)
    })

    socket.on('userReconnect', (pin)=>{
      for(let player of players){
        if(player.password == pin){
          io.emit('RecconectSuccess', player.playerID)
        }
      }
    })

    socket.on('clickable', ()=>{
      firstClickPlayer = null
      io.emit('clickable')
    });

    socket.on('resetClick', ()=>io.emit('resetClick'))
    socket.on('startAction', ()=>io.emit('startAction'))

    socket.on('click', (id)=>{
      if(!firstClickPlayer){
        firstClickPlayer = id;
        io.emit('firstClick', id);
      }
    })

    socket.on('refreshAdmin', ()=>{
      console.log(players)
      io.emit('refreshAdmin', players)
    })

    socket.on('addPoint', (id)=>{
      for(let player of players){
        if(player.playerID == id){
          player.points = player.points + 1;
        }
      }
      console.log(':-- ALL PLAYERS --:')
      console.log(players)
      console.log(':-- ALL END PLAYERS --:')
    })

  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        // @ts-expect-error private method and property
        engine.prepare(peer._internal.nodeReq);
        // @ts-expect-error private method and property
        engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
      }
    }
  }));
});