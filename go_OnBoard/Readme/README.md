# GO! onBoard - Najlepsza platforma e-learningowa, dzięki której szybko i sprawnie dotrzesz do celu.

## Wstęp

Platforma e-learningowa GO! onBoard automatyzuje najbardziej monotonne i uciążliwe aspekty kursów, takie jak ocenianie.Co więcej, w przypadku szkoleń firmowych umożliwia szkolenie pracowników bez konieczności opuszczania biura, umożliwiając zarządzanie wszystkimi procesami bezpośrednio z komputera służbowego. Dzięki temu pracownicy mają dostęp do edukacji w dowolnym miejscu i czasie za pośrednictwem Internetu, nawet za pomocą smartfonów.
![GO! onBoard](/Readme/Wstep.png)


# Back-end

Nasz zespół skorzystał z bazy danych Firebase - Firebase jest platformą umożliwiającą tworzenie aplikacji mobilnych i internetowych. Dzięki niej możesz szybko budować aplikacje wysokiej jakości, zwiększać zaangażowanie użytkowników i zwiększać swoje dochody. Ta platforma oferuje różnorodne funkcje, które są ściśle zintegrowane i mogą być łączone ze sobą.

Aplikacja napisana w ReactJS

ReactJS jest znakomicie przystosowany do skalowania, co oznacza, że jest idealnym wyborem zarówno dla małych, jak i dużych aplikacji. Dzięki modularnej strukturze i możliwości ponownego wykorzystania komponentów, projekt można łatwo rozbudowywać w miarę rozwoju.

Dzięki wykorzystaniu wirtualnego DOM-u (Modelu Obiektowego Dokumentu), ReactJS gwarantuje efektywną aktualizację tylko tych elementów strony, które faktycznie uległy zmianie. To przyczynia się do szybszego ładowania strony i płynniejszych interakcji.

Opierając się na komponentowej architekturze, ReactJS ułatwia organizację kodu i umożliwia jego wielokrotne wykorzystanie. Można tworzyć mniejsze, niezależne komponenty, które można łatwo łączyć w większe struktury, co przekłada się na bardziej modułowy, czytelny i łatwy w utrzymaniu kod.

Dzięki językowi JSX, który umożliwia połączenie kodu JavaScript z kodem HTML, ReactJS zapewnia prostą możliwość zarządzania logiką i wyglądem interfejsu użytkownika w jednym miejscu. Ten hybrydowy język ułatwia tworzenie dynamicznych interfejsów.

Społeczność programistów korzystających z ReactJS jest ogromna i aktywna, co oznacza dostęp do wielu zasobów, narzędzi, bibliotek i rozszerzeń. Ponadto, społeczność ta oferuje wsparcie oraz dzieli się wiedzą, co ułatwia rozwiązywanie problemów i ciągłe doskonalenie umiejętności.

ReactJS jest również elastyczny i łatwo integruje się z innymi narzędziami i bibliotekami. Można go łączyć z różnymi narzędziami do zarządzania stanem aplikacji, routingu, testowania itp., co zapewnia większą elastyczność i dostęp do rozległego ekosystemu narzędzi.

Metoda pracy naszego zespołu

Podczas tworzenia aplikacji oparliśmy się na metodzie Scrum. W kwestii kontroli zadań używaliśmy Jiry - to potężne narzędzie do zarządzania projektami, które umożliwia monitorowanie postępu, planowanie zadań, alokację zasobów i harmonogramowanie projektów. Można tworzyć i śledzić zadania, przypisywać je do członków zespołu i monitorować ich status. Jako codzienny komunikator używaliśmy Slacka - Slack umożliwia natychmiastową komunikację między członkami zespołu. Można tworzyć kanały tematyczne, wysyłać wiadomości prywatne i grupowe, dzielić się plikami i linkami oraz prowadzić wideokonferencje. To zapewnia szybką i efektywną wymianę informacji w czasie rzeczywistym.

Nasz zespół

- Bartosz Słodkowski
- Kamil Chwesiuk
- Wiktor Ślusarczyk
- Władysław Hrabryk

## Konfiguracja

Aby skonfigurować aplikację, wykonaj poniższe kroki:

1. Pobierz repozytorium z kodem aplikacji.
2. Otwórz terminal i przejdź do głównego katalogu aplikacji.
3. Wykonaj polecenie `npm install`, aby zainstalować wszystkie niezbędne paczki umożliwiające prawidłowe funkcjonowanie aplikacji.

### Jak to działa?

Aby użytkownik mógł korzystać z kursu, musi przejść przez proces rejestracji. Poniżej przedstawione są wymagane dane do podania podczas rejestracji:
![GO! onBoard](/Readme/Rejestracja.png)

- Login: [wprowadź login użytkownika]
- Hasło: [wprowadź hasło użytkownika]
- E-mail: [wprowadź adres e-mail użytkownika]

Te dane będą używane do logowania się do aplikacji.

## Logowanie
![GO! onBoard](/Readme/logowanie.png)

Aby zalogować się do aplikacji, wykonaj poniższe kroki:

1. Otwórz stronę logowania.
2. Wprowadź adres e-mail użytkownika w pole "E-mail".
3. Wprowadź hasło użytkownika w pole "Hasło".
4. Kliknij przycisk "Zaloguj się" lub naciśnij klawisz Enter, aby kontynuować.

Po pomyślnym zalogowaniu użytkownik będzie mógł przejść dalej i korzystać z funkcjonalności aplikacji.
## Brak rejestracji

Jeśli użytkownik nie posiada jeszcze konta, pojawi się powiadomienie o konieczności rejestracji. Aby zarejestrować się, wykonaj poniższe kroki:
![GO! onBoard](/Readme/email-nie-zostal.png)

1. Na stronie logowania, znajdź opcję "Zarejestruj się" 
2. Kliknij na tę opcję, aby przejść do formularza rejestracji.
3. Wprowadź wymagane dane, takie jak login, hasło i adres e-mail.
4. Kliknij przycisk "Zarejestruj się" lub naciśnij klawisz Enter, aby utworzyć nowe konto.

Po poprawnej rejestracji użytkownik będzie mógł zalogować się i korzystać z aplikacji.
## Resetowanie hasła

Nasza aplikacja umożliwia użytkownikowi zresetowanie hasła w przypadku jego zapomnienia. Aby zresetować hasło, postępuj zgodnie z poniższymi krokami:
![GO! onBoard](/Readme/przypomnij-haslo.png)

1. Na stronie logowania, znajdź opcję "nie pamiętam hasła".
2. Kliknij na tę opcję, aby przejść do formularza resetowania hasła.
3. Wprowadź swój adres e-mail powiązany z kontem.
4. Kliknij przycisk "Resetuj hasło" lub naciśnij klawisz Enter, aby wysłać prośbę o resetowanie hasła.

Po złożeniu prośby o resetowanie hasła, użytkownik otrzyma wiadomość e-mail z dalszymi instrukcjami. Następnie będzie mógł ustawić nowe hasło i zalogować się do aplikacji.

## Strona główna GO! Onboard


## Po prawidłowym zalogowaniu użytkownika powita go moduł, który zaprosi go do kursu.
![GO! onBoard](/Readme/powitanie.png)


## Nauka
![GO! onBoard](/Readme/zadania.png)
Przejdźmy teraz do najważniejszej części naszej aplikacji - nauki. Nasza platforma e-learningowa oferuje szeroki zakres kursów i materiałów edukacyjnych, które pomogą Ci w doskonaleniu umiejętności.

Aby rozpocząć naukę, postępuj zgodnie z poniższymi krokami:

1. Zaloguj się do swojego konta, używając swojego loginu i hasła.
2. Po zalogowaniu, będziesz miał dostęp do panelu głównego.
3. W panelu głównym, znajdź "Kursy".
4. Kliknij na wybrany kurs, aby otworzyć stronę kursu.
5. Na stronie kursu, będziesz miał dostęp do lekcji, materiałów, zadań i innych zasobów edukacyjnych.
6. Wybierz lekcję, która Cię interesuje i rozpocznij naukę.


# Dodawanie filmu do kursu
![GO! onBoard](/Readme/filmm.png)


# Po przycisnięciu przycisku "obejrzyj film" pojawi się moduł z filmem
![GO! onBoard](/Readme/modul-filmowy.png)
W każdym kursie, administrator ma możliwość dodania filmu, który kursanci będą mieli możliwość obejrzenia. Film może pełnić rolę materiału wprowadzającego, prezentacji tematu lub praktycznego przykładu.

# Zapisywanie notatek

Możliwość zapisywania notatek jest jedną z funkcji dostępnych w naszej aplikacji. Pisanie notatek podczas nauki, spotkań czy czytania artykułów może mieć wiele korzyści. Oto dlaczego warto zapisywać notatki:
![GO! onBoard](/Readme/notatka.png)
- Skupienie: Pisząc notatki, skupiamy się bardziej na przekazywanych informacjach, co pomaga nam zredukować rozpraszające czynniki i zwiększyć koncentrację.
- Zapamiętywanie: Pisanie notatek pozwala nam przetworzyć i ułożyć informacje w naszej głowie, co ułatwia zapamiętywanie treści.
- Organizacja: Notatki umożliwiają nam uporządkowanie i strukturyzację informacji, dzięki czemu łatwiej jest je odnaleźć i przypomnieć sobie w przyszłości.
- Powtórka: Notatki stanowią świetne źródło do powtórki i przeglądu materiału w późniejszym czasie, co pomaga utrwalać i utrzymywać zdobytą wiedzę.
- Refleksja: Przeglądając swoje notatki, możemy dokonać refleksji nad przyswojonymi treściami, porównywać różne perspektywy i wyciągać wnioski.

Aby skorzystać z funkcji zapisywania notatek w naszej aplikacji, postępuj zgodnie z poniższymi krokami:

1. Zaloguj się do swojego konta.
2. Przejdź do sekcji, w której chcesz zapisać notatki (np. kurs, artykuł, spotkanie).
3. Znajdź przycisk lub pole do tworzenia nowej notatki.
4. Kliknij na przycisk lub rozpocznij pisanie w polu, aby rozpocząć tworzenie notatki.
5. Zapisz notatkę, klikając przycisk "Zapisz" lub wykonując odpowiednią akcję.
6. Twoja notatka zostanie zapisana i będzie dostępna w wybranej sekcji.

Pamiętaj, że notatki są prywatne i dostępne tylko dla Ciebie, chyba że zdecydujesz się je udostępnić innym użytkownikom.

Korzystanie z funkcji zapisywania notatek może znacznie zwiększyć efektywność Twojej pracy i nauki. Zachęcamy do wykorzystywania tej funkcji i systematycznego tworzenia oraz przechowywania notatek w naszej aplikacji.




