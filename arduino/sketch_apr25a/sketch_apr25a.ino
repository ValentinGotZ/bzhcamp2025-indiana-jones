#include "HX711.h"

const int broche_DT = 23;
const int broche_SCK = 22;

String inputString = "";
bool stringComplete = false;

HX711 balance;

void handle_root() {

String mesure = String(balance.get_units(100));
}

void setup(void)
{
  // Affichage dans le moniteur série:
  Serial.begin(115200);

  balance.begin(broche_DT, broche_SCK);

  while (!balance.is_ready())
  {
    ;
  }
  Serial.println("Taration !!");

  balance.set_scale(739); //le paramètre dépend de votre cellule de charge.
  balance.tare(); //ajustement du zéro

  Serial.println("La balance est prete!");

}

void loop(void)
{
  Serial.println(balance.get_units(10));

  if (stringComplete) {
    stringComplete = false;
    Serial.println("instruction recu");
    if (inputString.indexOf("TARE") >= 0) {
      Serial.println("Taration !!");
      balance.tare();
    }
    inputString = "";
  }
}

void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if (inChar == '\n') {
      stringComplete = true;
    } else {
      inputString += inChar;
    }
  }
}