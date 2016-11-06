var xcoor = 1;
		 var ycoor = 1;
		 var ndoor = 1;
		 var sdoor = 1;
		 var edoor = 1;
		 var wdoor = 1;
		 var key = 0;
		 var gun = 0;
		 var bullets = 0;
		 var keyRoom12 = true;
		 var lock10w = true;
		 var gun31 = true;
		 var bullet32 = true;
		 var bullet30 = true;
		 var grue01 = true;
		 var score = 0;
		 var firstTime = [0,1,2,3,4,5,6,7,8,9,10,11];
		 var sleeping_grue=false;
		 var direction = "n";
		 for(x=0;x<12;x++)
			firstTime[x]=1;
		 // little map of the game below
		 // 00|10|20|30
		 // 01|11|21|31
		 // 02|12|22|32
		 function init(){
			message("You find yourself in what appears to be a castle dungeon, there are doors to the north, south, east and west.");
		 }
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
					if(keyRoom12==true&&xcoor==1&&ycoor==2){
						key++;
						keyRoom12 = false;
						message("You pick up a key!");
						break;
					}
					if(gun31==true&&xcoor==3&&ycoor==1){
						gun++;
						gun31 = false;
						message("You pick up a gun!");
						break;
					}
					if(bullet32==true&&xcoor==3&&ycoor==2){
						bullets++;
						bullet32 = false;
						message("You pick up a bullet!");
						break;
					}
					if(bullet30==true&&xcoor==3&&ycoor==0){
						bullets++;
						bullet30 = false;
						message("You pick up a bullet!");
						break;
					}
					message("There is nothing to take.");
					break;
				case "shoot":
					if(gun>0){
						if(bullets>0){
							bullets--;
							if(xcoor==0&&ycoor==1){
								grue01=false;
								sleeping_grue=false;
								message("You shot the grue! It is making a gurgling sound. Looks like it won't survive...");
								break;
							}
							else{
								message("You shoot the gun and leave a bullet sized dent in the wall.");
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
				case "inventory":
					message("Gun(s): " + gun + ", Key(s): " + key + ", Bullet(s): " + bullets);
					break;
				case "help":
					message("Enter N, S, E or W to move. Enter List to view inventory. Enter Take to take an item. Enter Shoot to shoot the gun.");
					break;
				default:
					message("Please enter N, S, E or W.");
			}
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
		 
         function btnN_click() {
			direction = "n";
			if(ndoor==1)
				ycoor--;
			else if(ndoor==2&&key>0){
				roomCheck();
				ndoor--;
				ycoor--;
				key--;
				alert("You used a key!");
			}
			else if(ndoor==2){
				message("The door is locked.")
				return(0);
			} 
			else if(ndoor==0){
				message("You run into a wall.")
				if(sleeping_grue==true){
					message("You run into a wall and make a crashing sound. You woke the grue. The grue EATS YOU! Game over.")
					shutdown()
				}
				return(0);
			}
			roomCheck();
         }
		 
		 function btnS_click() {
			direction = "s";
			if(sdoor==1)
				ycoor++;
			else if(sdoor==2&&key>0){
				roomCheck();
				sdoor--;
				ycoor++;
				key--;
				alert("You used a key!");
			}
			else if(sdoor==2){
				message("The door is locked.")
				return(0);
			}
			else if(sdoor==0){
				message("You run into a wall.")
				if(sleeping_grue==true){
					message("You run into a wall and make a crashing sound. You woke the grue. The grue EATS YOU! Game over.")
					shutdown()
				}
				return(0);
			}
			roomCheck();
         }
		 
		 function btnE_click() {
			direction = "e";
			if(edoor==1)
				xcoor++;
			else if(edoor==2&&key>0){
				roomCheck();
				edoor--;
				xcoor++;
				key--;
				alert("You used a key!");
			}
			else if(edoor==2){
				message("The door is locked.")
				return(0);
			} 
			else if(edoor==0){
				message("You run into a wall.")
				if(sleeping_grue==true){
					message("You run into a wall and make a crashing sound. You woke the grue. The grue EATS YOU! Game over.")
					shutdown()
				}
				return(0);
			}
			roomCheck();
         }
		 
		 function btnW_click() {
			direction = "w";
			if(wdoor==1)
				xcoor--;
			else if(wdoor==2&&key>0){
				roomCheck();
				wdoor--;
				xcoor--;
				key--;
				alert("You used a key!");
			}
			else if(wdoor==2){
				message("The door is locked.")
				return(0);
			} 
			else if(wdoor==0){
				message("You run into a wall.")
				if(sleeping_grue==true){
					message("You run into a wall and make a crashing sound. You woke the grue. The grue EATS YOU! Game over.")
					shutdown()
				}
				return(0);
			}
			roomCheck();
         }
		 
		 function roomCheck() {
			sleeping_grue=false;
			switch(xcoor){
				case 0:
					switch(ycoor){
						case 0:
							if(firstTime[0]==1){
								score+=5;
								firstTime[0]--;
							}
							if(direction=="w")
								lock10w=false;
							message("You're outside! You see a taxi! You hail it over. You might even get yourself home before bedtime. Congratulations, you've escaped!");
							ndoor = 0;
							sdoor = 0;
							edoor = 1;
							wdoor = 0;
							shutdown()
							break;
						case 1:
							if(firstTime[1]==1){
								score+=5;
								firstTime[1]--;
							}
							if(grue01==true){
								message("You see a grue... looks like its sleeping.");
								sleeping_grue=true;
							}
							else{
								message("You see the grue you shot on the floor. It probably had a family...");
							}
							ndoor = 0;
							sdoor = 0;
							edoor = 1;
							wdoor = 0;
							document.getElementById("btnN").disabled= true;
							document.getElementById("btnS").disabled= true;
							document.getElementById("btnE").disabled= false;
							document.getElementById("btnW").disabled= true;
							break;
						case 2:
							if(firstTime[2]==1){
								score+=5;
								firstTime[2]--;
							}
							message("You feel a presence surround you. It makes you uneasy.");
							ndoor = 0;
							sdoor = 0;
							edoor = 1;
							wdoor = 0;
							document.getElementById("btnN").disabled= true;
							document.getElementById("btnS").disabled= true;
							document.getElementById("btnE").disabled= false;
							document.getElementById("btnW").disabled= true;
							break;
					}
					break;
				case 1:
					switch(ycoor){
						case 0:
							if(firstTime[3]==1){
								score+=5;
								firstTime[3]--;
							}
							message("There is a broken chandelier on top of a table. Looks like it fell. Also there is a door to the west.");
							if(lock10w==true){
								wdoor=2;
							}
							else
								wdoor=1;
							ndoor = 0;
							sdoor = 1;
							edoor = 0;
							document.getElementById("btnN").disabled= true;
							document.getElementById("btnS").disabled= false;
							document.getElementById("btnE").disabled= true;
							document.getElementById("btnW").disabled= false;
							break;
						case 1:
							message("You're back in the room you started in.");
							ndoor = 1;
							sdoor = 1;
							edoor = 1;
							wdoor = 1;
							document.getElementById("btnN").disabled= false;
							document.getElementById("btnS").disabled= false;
							document.getElementById("btnE").disabled= false;
							document.getElementById("btnW").disabled= false;
							break;
						case 2:
							if(firstTime[5]==1){
								score+=5;
								firstTime[5]--;
							}
							message("You walk into a spooky room. There are bodies hanging and a strange smelly ooze leaking from the walls.");
							if(keyRoom12==true){
								message("You walk into a spooky room. There are bodies hanging and a strange smelly ooze leaking from the walls. Also see a key on one of the bodies!");
							}
							ndoor = 1;
							sdoor = 0;
							edoor = 0;
							wdoor = 1;
							document.getElementById("btnN").disabled= false;
							document.getElementById("btnS").disabled= true;
							document.getElementById("btnE").disabled= true;
							document.getElementById("btnW").disabled= false;
							
							break;
					}
					break;
				case 2:
					switch(ycoor){
						case 0:
							if(firstTime[6]==1){
								score+=5;
								firstTime[6]--;
							}
							message("Room 2,0");
							ndoor = 0;
							sdoor = 0;
							edoor = 0;
							wdoor = 0;
							document.getElementById("btnN").disabled= true;
							document.getElementById("btnS").disabled= true;
							document.getElementById("btnE").disabled= true;
							document.getElementById("btnW").disabled= true;
							break;
						case 1:
							message("You're in an empty room.");
							if(firstTime[7]==1){
								score+=5;
								firstTime[7]--;
								message("There is a man in this room. Oh my! He just disappeared in front of you! You're alone now.");
							}
							ndoor = 0;
							sdoor = 0;
							edoor = 1;
							wdoor = 1;
							document.getElementById("btnN").disabled= true;
							document.getElementById("btnS").disabled= true;
							document.getElementById("btnE").disabled= false;
							document.getElementById("btnW").disabled= false;
							break;
						case 2:
							if(firstTime[8]==1){
								score+=5;
								firstTime[8]--;
							}
							message("Room 2,2");
							ndoor = 0;
							sdoor = 0;
							edoor = 0;
							wdoor = 0;
							document.getElementById("btnN").disabled= true;
							document.getElementById("btnS").disabled= true;
							document.getElementById("btnE").disabled= true;
							document.getElementById("btnW").disabled= true;
							break;
					}
					break;
				case 3:
					switch(ycoor){
						case 0:
							if(firstTime[9]==1){
								score+=5;
								firstTime[9]--;
							}
							message("It looks like there was a shoot out, between two hooligans. They both lie dead on the floor.");
							if(bullet30==true){
								message("It looks like there was a shoot out, between two hooligans. They both lie dead on the floor. One of them has a bullet in their hand.");
							}
							ndoor = 0;
							sdoor = 1;
							edoor = 0;
							wdoor = 0;
							document.getElementById("btnN").disabled= true;
							document.getElementById("btnS").disabled= false;
							document.getElementById("btnE").disabled= true;
							document.getElementById("btnW").disabled= true;
							break;
						case 1:
							if(firstTime[10]==1){
								score+=5;
								firstTime[10]--;
							}
							message("It looks like someone ransacked the gun case in this room, there is shattered glass everywhere.");
							if(gun31==true){
								message("It looks like someone ransacked the gun case in this room, there is shattered glass everywhere. You can see a gun lying on the ground next to the shattered glass.");
							}
							ndoor = 1;
							sdoor = 1;
							edoor = 0;
							wdoor = 1;
							document.getElementById("btnN").disabled= false;
							document.getElementById("btnS").disabled= false;
							document.getElementById("btnE").disabled= true;
							document.getElementById("btnW").disabled= false;
							break;
						case 2:
							if(firstTime[11]==1){
								score+=5;
								firstTime[11]--;
							}
							message("There is a table in the center of the room");
							if(bullet32==true){
								message("There is a single silver bullet sitting straight up on a table in the center of the room.");
							}
							ndoor = 1;
							sdoor = 0;
							edoor = 0;
							wdoor = 0;
							document.getElementById("btnN").disabled= false;
							document.getElementById("btnS").disabled= true;
							document.getElementById("btnE").disabled= true;
							document.getElementById("btnW").disabled= true;
							break;
					}
					break;
			}
			document.getElementById("score").innerHTML="Points: "+score;
		}