export const errorCodes: { [key in string]: string } = {
  "user/exists": "Użytkownik o podanym adresie email już istnieje",
  "client/exists": "Taki klient istnieje już w Twoim salonie",
  "company/name_required": "Nazwa firmy jest wymagana",
  "event/limit_exceeded": "Przekroczyłeś limit zajęć w roku. Skontaktuj się z nami aby zwiększyć plan",
  "result/exists": "Dodałeś już swój wynik w tych zajęciach"
}
