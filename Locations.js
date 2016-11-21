var xcoor = 1;
var ycoor = 1;
var ndoor = 1;
var sdoor = 1;
var edoor = 1;
var wdoor = 1;
var lock10w = true;
var grue01 = true;
var score = 0;
var firstTime = [1,1,1,1,0,1,1,1,1,1,1,1];
var sleeping_grue=false;
var direction = "n";
var items = [0,1,2,3];
var rooms = [0,1,2,3,4,5,6,7,8,9,10,11];

// little map of the game below
// 00|10|20|30
// 01|11|21|31
// 02|12|22|32

function init(){
	message("You find yourself in what appears to be a castle dungeon, there are doors to the north, south, east and west.");
}

function shutdown(){
	document.getElementById("btnN").disabled= true;
	document.getElementById("btnS").disabled= true;
	document.getElementById("btnE").disabled= true;
	document.getElementById("btnW").disabled= true;
	document.getElementById("btn_click").disabled= true;
}

function message(mess){
	var targetTextArea = document.getElementById("taMain");
	targetTextArea.value= mess;
}

function Location(id,description,sdescription, item,a,b,c,d){
	this.id=id;
	this.description=description;
	this.subdescription=sdescription;
	this.item=item;
	this.n=a;
	this.s=b;
	this.e=c;
	this.w=d;
	this.activate=function(){
		if(firstTime[this.id]==1&&this.id!=7){
			score+=5;
			firstTime[this.id]--;
		}
		ndoor=this.n;
		sdoor=this.s;
		edoor=this.e;
		wdoor=this.w;
		message(this.description);
		switch(this.id){
			case 0:
				if(direction=="w")
					lock10w=false;
				shutdown();
				break;
			case 1:
				if(grue01==true){
					message(this.description);
					sleeping_grue=true;
				}	
				else{
					message(this.subdescription);
				}
				break;
			case 2:
				break;
			case 3:
				if(lock10w==true){
					wdoor=2;
				}
				else
					wdoor=1;
				break;
			case 4:
				break;
			case 5:
				if(keyq.Status==0){
					message(this.subdescription);
				}
				break;
			case 6:
				break;
			case 7:
				if(firstTime[7]==1){
					score+=5;
					firstTime[7]--;
					message(this.subdescription);
				}
				break;
			case 8:
				break;
			case 9:
				if(bullet2.Status==0){
					message(this.subdescription);
				}
				break;
			case 10:
				if(gunq.Status==0){
					message(this.subdescription);
				}
				break;
			case 11:
				if(bullet1.Status==0){
					message(this.subdescription);
				}
				break;
		}
		document.getElementById("btnN").disabled= !this.n;
		document.getElementById("btnS").disabled= !this.s;
		document.getElementById("btnE").disabled= !this.e;
		document.getElementById("btnW").disabled= !this.w;
		if(xcoor==0&&ycoor==0)
			shutdown();
	}
	this.toString=function(){return this.name;};
 }

var room0 = new Location(0,"You're outside! You see a taxi! You hail it over. You might even get yourself home before bedtime. Congratulations, you've escaped!"," ","none",0,0,1,0);
var room1 = new Location(1,"You see a grue... looks like its sleeping.","You see the grue you shot on the floor. It probably had a family...","none",0,0,1,0);
var room2 = new Location(2,"You feel a presence surround you. It makes you uneasy."," ","none",0,0,1,0);
var room3 = new Location(3,"There is a broken chandelier on top of a table. Looks like it fell. Also there is a door to the west."," ","none",0,1,0,1);
var room4 = new Location(4,"You're back in the room you started in."," ","none",1,1,1,1);
var room5 = new Location(5,"You walk into a spooky room. There are bodies hanging and a strange smelly ooze leaking from the walls.","You walk into a spooky room. There are bodies hanging and a strange smelly ooze leaking from the walls. Also see a key on one of the bodies!","key",1,0,0,1);
var room6 = new Location(6,"Room 2,0","Room 2,0","none",0,0,0,0);
var room7 = new Location(7,"You're in an empty room.","There is a man in this room. Oh my! He just disappeared in front of you! You're alone now.","none",0,0,1,1);
var room8 = new Location(8,"Room 2,2","Room 2,2","none",0,0,0,0);
var room9 = new Location(9,"It looks like there was a shoot out, between two hooligans. They both lie dead on the floor.","It looks like there was a shoot out, between two hooligans. They both lie dead on the floor. One of them has a bullet in their hand.","bullet1",0,1,0,0);
var room10 = new Location(10,"It looks like someone ransacked the gun case in this room, there is shattered glass everywhere.","It looks like someone ransacked the gun case in this room, there is shattered glass everywhere. You can see a gun lying on the ground next to the shattered glass.","gun",1,1,0,1);
var room11 = new Location(11,"There is a table in the center of the room","There is a single silver bullet sitting straight up on a table in the center of the room.","bullet2",1,0,0,0);
		 
rooms[0]=room0;
rooms[1]=room1;
rooms[2]=room2;
rooms[3]=room3;
rooms[4]=room4;
rooms[5]=room5;
rooms[6]=room6;
rooms[7]=room7;
rooms[8]=room8;
rooms[9]=room9;
rooms[10]=room10;
rooms[11]=room11;
 
function Item(name,id,description,stat){
	this.name=name;
	this.id=id;
	this.description=description;
	this.Status=stat;
	this.take=function(){this.Status=1};
	this.use=function(){this.Status=-1};
	this.toString=function(){return this.name;};
}
		 
var keyq = new Item("Key",0,"A key that can be used to unlock doors.",0);
var bullet1 = new Item("Silver Bullet",1,"A bullet that can be used with a gun.",0);
var bullet2 = new Item("Bullet",2,"A bullet that can be used with a gun.",0);
var gunq = new Item("Gun",3,"A gun that can be used with bullets.",0);

items[0]=keyq;
items[1]=bullet1;
items[2]=bullet2;
items[3]=gunq;

function btnGo_click(){
	var input = document.getElementById("txtCommand").value;
	input = input.toLowerCase();
	switch(input){
		case "n":
			btnN_click();
			break;
		case "s":
			btnS_click();
			break;
		case "e":
			btnE_click();
			break;
		case "w":
			btnW_click();
			break;
		case "take":
			if(keyq.Status==0&&xcoor==1&&ycoor==2){
				keyq.take();
				message("You pick up a key!");
				break;
			}
			if(gunq.Status==0&&xcoor==3&&ycoor==1){
				gunq.take();
				message("You pick up a gun!");
				break;
			}
			if(bullet1.Status==0&&xcoor==3&&ycoor==2){
				bullet1.take();
				message("You pick up a silver bullet!");
				break;
			}
			if(bullet2.Status==0&&xcoor==3&&ycoor==0){
				bullet2.take();
				message("You pick up a bullet!");
				break;
			}
			message("There is nothing to take.");
			break;
		case "shoot":
			if(gunq.Status>0){
				if(bullet1.Status>0){
					bullet1.use();
					if(xcoor==0&&ycoor==1){
						grue01=false;
						sleeping_grue=false;
						message("You shot the grue! It is making a gurgling sound. Looks like it won't survive...");
						break;
					}
					else{
						message("You shoot the gun and leave a bullet sized dent in the wall.");
						break;
					}
				}
				else if(bullet2.Status>0){
					bullet2.use();
					if(xcoor==0&&ycoor==1){
						grue01=false;
						sleeping_grue=false;
						message("You shot the grue! It is making a gurgling sound. Looks like it won't survive...");
						break;
					}
					else{
						message("You shoot the gun and leave a bullet sized dent in the wall.");
						break;
					}
				}
				else{
					message("You have no bullets.");
					break;
				}
			}
			else{
				message("You have nothing to shoot with.");
				break;
			}
		case "list":
		case "i":
		case "inventory":
			var inv="|";
			for(var y=0;y<4;y++){
				if(items[y].Status==1)
					inv=inv+items[y].name+"|";
			}
			message(inv);
			break;
		case "help":
			message("Enter N, S, E or W to move. Enter Inventory to view inventory. Enter Take to take an item. Enter Shoot to shoot the gun. Enter Help to view a list of commands.");
			break;
		default:
			message("Invalid Command. Enter N, S, E or W to move. Enter Inventory to view inventory. Enter Take to take an item. Enter Shoot to shoot the gun. Enter Help to view a list of commands.");
	}
}

function btnN_click() {
	direction = "n";
	if(ndoor==1)
		ycoor--;
	else if(ndoor==2&&keyq.Status==1){
		roomCheck();
		ndoor--;
		ycoor--;
		keyq.use();
		alert("You used a key!");
	}
	else if(ndoor==2){
		message("The door is locked.");
		return(0);
	} 
	else if(ndoor==0){
		message("You run into a wall.");
		if(sleeping_grue==true){
			message("You run into a wall and make a crashing sound. You woke the grue. The grue EATS YOU! Game over.");
			shutdown();
		}
		return(0);
	}
	roomCheck();
}
		 
function btnS_click() {
	direction = "s";
	if(sdoor==1)
		ycoor++;
	else if(sdoor==2&&keyq.Status==1){
		roomCheck();
		sdoor--;
		ycoor++;
		keyq.use();
		alert("You used a key!");
	}
	else if(sdoor==2){
		message("The door is locked.");
		return(0);
	}
	else if(sdoor==0){
		message("You run into a wall.");
		if(sleeping_grue==true){
			message("You run into a wall and make a crashing sound. You woke the grue. The grue EATS YOU! Game over.");
			shutdown();
		}
		return(0);
	}
	roomCheck();
}
		 
function btnE_click() {
	direction = "e";
	if(edoor==1)
		xcoor++;
	else if(edoor==2&&keyq.Status==1){
		roomCheck();
		edoor--;
		xcoor++;
		keyq.use();
		alert("You used a key!");
	}
	else if(edoor==2){
		message("The door is locked.");
		return(0);
	} 
	else if(edoor==0){
		message("You run into a wall.");
		if(sleeping_grue==true){
			message("You run into a wall and make a crashing sound. You woke the grue. The grue EATS YOU! Game over.");
			shutdown();
		}
		return(0);
	}
	roomCheck();
}
		 
function btnW_click() {
	direction = "w";
	if(wdoor==1)
		xcoor--;
	else if(wdoor==2&&keyq.Status==1){
		roomCheck();
		wdoor--;
		xcoor--;
		keyq.use();
		alert("You used a key!");
	}
	else if(wdoor==2){
		message("The door is locked.");
		return(0);
	} 
	else if(wdoor==0){
		message("You run into a wall.");
		if(sleeping_grue==true){
			message("You run into a wall and make a crashing sound. You woke the grue. The grue EATS YOU! Game over.");
			shutdown();
		}
		return(0);
	}
	roomCheck();
}		

function roomCheck() {
	var x; //location id
	sleeping_grue=false;
	switch(xcoor){
		case 0:
			switch(ycoor){
				case 0:
					x=0;
					break;
				case 1:
					x=1;
					break;
				case 2:
					x=2;
					break;
			}
			break;
		case 1:
			switch(ycoor){
				case 0:
					x=3;
					break;
				case 1:
					x=4;
					break;
				case 2:
					x=5;
					break;
			}
			break;
		case 2:
			switch(ycoor){
				case 0:
					x=6;
					break;
				case 1:
					x=7;
					break;
				case 2:
					x=8;
					break;
			}
			break;
		case 3:
			switch(ycoor){
				case 0:
					x=9;
					break;
				case 1:
					x=10;
					break;
				case 2:
					x=11;
					break;
			}
			break;
	}
	rooms[x].activate();
	document.getElementById("score").innerHTML="Points: "+score;
}