/**************************************************************************/
/*! 
*/
/**************************************************************************/
#include <Microduino_NFC.h>
#include <Microduino_AudioPro.h>
#include <SD.h>
#define serial_bluetooth Serial
#define serial_nfc Serial

NFC nfc;
AudioPro_FilePlayer musicPlayer =  AudioPro_FilePlayer(SD);

uint8_t fileNum = 0;  //文件数量

void playNum(uint8_t num) {
  if (num > musicPlayer.getMusicNum() - 1) {
    return;
  }

  if (!musicPlayer.stopped()) {
    musicPlayer.stopPlaying();  //必要，否则SD类得不到关闭，内存溢出
  }
  musicPlayer.flushCancel(both);  //清缓存，播放MIDI等格式文件时必要

  String _name = musicPlayer.getMusicName(num);
  //Serial.print(F("Playing:"));
  if (!musicPlayer.playMP3(_name)) {
    //Serial.println(F("ERROR"));
  }
  else {
    //Serial.print(F("OK \t File: "));
    //Serial.println(_name);
  }
}

void setup(void) {
  pinMode(8,OUTPUT);
  pinMode(SD_PIN_SEL, OUTPUT);    //先初始化AudioPro，所以先使能SD卡
  digitalWrite(SD_PIN_SEL, HIGH);
  serial_bluetooth.begin(115200);
  serial_nfc.begin(9600);
  serial_nfc.println("Hello!");
  delay(500);

   if (! musicPlayer.begin()) { // initialise the music player
   // Serial.println(F("Couldn't find VS1053, do you have the right pins defined?"));
    //while (1);
  }
  if (!SD.begin(SD_PIN_SEL)) {

  musicPlayer.setVolume(96);  //left & right 0-127

  musicPlayer.useInterrupt(VS1053_PIN_DREQ);  // DREQ int
  }
    
  uint32_t versiondata = nfc.begin();

  if (! versiondata) {
    serial_nfc.print("Didn't find PN53x board");
    while (1); // halt
  }
  
  // Got ok data, print it out!
//  serial_nfc.print("Found chip PN5"); serial_nfc.println((versiondata>>24) & 0xFF, HEX); 
//  serial_nfc.print("Firmware ver. "); serial_nfc.print((versiondata>>16) & 0xFF, DEC); 
//  serial_nfc.print('.'); serial_nfc.println((versiondata>>8) & 0xFF, DEC);
  
  // Set the max number of retry attempts to read from a card
  // This prevents us from waiting forever for a card, which is
  // the default behaviour of the PN532.
  nfc.setPassiveActivationRetries(0xFF);
    
  serial_nfc.println("Waiting for an ISO14443A card");
}

void loop(void) {
  boolean success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  
  // Wait for an ISO14443A type cards (Mifare, etc.).  When one is found
  // 'uid' will be populated with the UID, and uidLength will indicate
  // if the uid is 4 bytes (Mifare Classic) or 7 bytes (Mifare Ultralight)
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
  
  if (success) {
    int total=uid[0]+uid[1]+uid[2]+uid[3]+uid[4]+uid[5]+uid[6];
     if(total==749) {
      
        char c = '9';
        int num = c - 48;
        playNum(num);
     }//熊猫
     if(total==879){
      char c = '1';
      int num= c - 48;
      playNum(num);
     }//猴子
     if(total==809){
      char c = '2';
      int num= c - 48;
      playNum(num);
     }//狐狸
    serial_bluetooth.println(total);
    digitalWrite(8,HIGH);
    delay(5000);
  }
  else
  {
    digitalWrite(8,LOW);
    // PN532 probably timed out waiting for a card
//    serial_nfc.println("Timed out waiting for a card");
  }
}
