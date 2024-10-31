export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  const db = useDatabase();
  await db.sql`DROP TABLE IF EXISTS TournamentPlayer`;
  await db.sql`DROP TABLE IF EXISTS player`;
  await db.sql`CREATE TABLE IF NOT EXISTS Player (ID INTEGER PRIMARY KEY,
                                                  Name varchar(40) NOT NULL UNIQUE,
                                                  Image MEDIUMBLOB)`;
  await db.sql`CREATE TABLE IF NOT EXISTS Tournament (ID INTEGER PRIMARY KEY,
                                                      Date DATE,
                                                      Name varchar(40) NOT NULL)`;
  await db.sql`CREATE TABLE IF NOT EXISTS TournamentPlayer (ID INTEGER PRIMARY KEY,
                                                            PlayerID INTEGER NOT NULL,
                                                            TournamentID INTEGER NOT NULL,
                                                            FOREIGN KEY(PlayerID) REFERENCES Player(ID),
                                                            FOREIGN KEY(TournamentID) REFERENCES Tournament(ID))`; 
  await db.sql`CREATE TABLE IF NOT EXISTS QuestionType (ID INTEGER PRIMARY KEY,
                                                        Name varchar(100) NOT NULL)`;  
  await db.sql`CREATE TABLE IF NOT EXISTS Answer (ID INTEGER PRIMARY KEY,
                                                  Title varchar(100) NOT NULL,
                                                  IsAnswerCorrect BOOL)`; 
  await db.sql`CREATE TABLE IF NOT EXISTS Question (ID INTEGER PRIMARY KEY,
                                                    Title varchar(100) NOT NULL,
                                                    Type INTEGER NOT NULL,
                                                    MultimediaPath varchar(200),
                                                    FOREIGN KEY(Type) REFERENCES QuestionType(ID))`;  
  await db.sql`CREATE TABLE IF NOT EXISTS TournamentQuestion (ID INTEGER PRIMARY KEY,
                                                              QuestionID INTEGER NOT NULL,
                                                              TournamentID INTEGER NOT NULL,
                                                              FOREIGN KEY(QuestionID) REFERENCES Question(ID),
                                                              FOREIGN KEY(TournamentID) REFERENCES Tournament(ID))`;
  await db.sql`CREATE TABLE IF NOT EXISTS QuestionAnswer (ID INTEGER PRIMARY KEY,
                                                          AnswerID INTEGER NOT NULL,
                                                          QuestionID INTEGER NOT NULL,
                                                          FOREIGN KEY(AnswerID) REFERENCES Answer(ID),
                                                          FOREIGN KEY(QuestionID) REFERENCES Question(ID))`; 
  await db.sql`CREATE TABLE IF NOT EXISTS Press (ID INTEGER PRIMARY KEY,
                                                PressedTime TIMESTAMP,
                                                StartQuestionTime TIMESTAMP,
                                                FirstPressTime TIMESTAMP)`; 
  await db.sql`CREATE TABLE IF NOT EXISTS PlayerAnswer (ID INTEGER PRIMARY KEY,
                                                        QuestionID INTEGER NOT NULL,
                                                        IsAnswerCorrect BOOL,
                                                        FOREIGN KEY(QuestionID) REFERENCES Question(ID))`;
  await db.sql`CREATE TABLE IF NOT EXISTS StatisticTournament (ID INTEGER PRIMARY KEY,
                                                                TournamentID INTEGER NOT NULL,
                                                                PlayerID INTEGER NOT NULL,
                                                                PressID INTEGER NOT NULL,
                                                                PlayerAnswerID INTEGER NOT NULL,
                                                                FOREIGN KEY(TournamentID) REFERENCES Tournament(ID),
                                                                FOREIGN KEY(PlayerID) REFERENCES Player(ID),
                                                                FOREIGN KEY(PressID) REFERENCES Press(ID),
                                                                FOREIGN KEY(PlayerAnswerID) REFERENCES PlayerAnswer(ID))`;
  await db.sql`CREATE TABLE IF NOT EXISTS Poll (ID INTEGER PRIMARY KEY,
                                                Name varchar(100) NOT NULL,
                                                Date DATE,
                                                TournamentID INTEGER NOT NULL,
                                                FOREIGN KEY(TournamentID) REFERENCES Tournament(ID))`; 
  await db.sql`CREATE TABLE IF NOT EXISTS PollOption (ID INTEGER PRIMARY KEY,
                                                      Name varchar(200) NOT NULL,
                                                      Count int)`;                                               
  await db.sql`CREATE TABLE IF NOT EXISTS PollQuestion (ID INTEGER PRIMARY KEY,
                                                        PollID INTEGER NOT NULL,
                                                        OptionID INTEGER NOT NULL,
                                                        FOREIGN KEY(PollID) REFERENCES Poll(ID),
                                                        FOREIGN KEY(OptionID) REFERENCES PollOption(ID))`;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
});       