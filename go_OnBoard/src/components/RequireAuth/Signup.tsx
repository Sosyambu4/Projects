import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut, getAuth, updateProfile } from "firebase/auth";
import { auth, database } from "../../utils/firebase/firebase.config";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { Button, Card, Card2, Cards, FormSign, ImgMain, Input, Label, LinkName, LogoImg, LogoName, NamePage, TextString } from "./Sign.styled";
import imgProgrammer from "../../assets/signin/Chlopak.png";
import imgLogo from "../../assets/signin/Logo.png";
import { FooterMain } from "./Footer";

interface CreateUserError {
  message: string;
}

type FirebaseErrorCode = "auth/email-already-in-use" | "auth/invalid-email" | "auth/user-not-found" | "auth/wrong-password" | "auth/weak-password";

type FirebaseErrorMessages = {
  [key in FirebaseErrorCode]: string;
};

const firebaseErrors: FirebaseErrorMessages & { [key: string]: string } = {
  "auth/email-already-in-use": "E-mail jest już zarejestrowany.",
  "auth/invalid-email": "Wprowdź poprawny e-mail",
  "auth/user-not-found": "E-mail nie został zarejestrowany",
  "auth/wrong-password": "Niepoprawne hasło",
  "auth/weak-password": "Hasło powinno zawierać conajmniej 6 znaków",
};

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [profileName, setProfileName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const initUserRef = collection(database, "initUser");
    const queryUser = query(initUserRef, where("email", "==", email));

    try {
      const snapshot = await getDocs(queryUser);

      if (snapshot.size > 0) {
        snapshot.docs.forEach(async (docSnapshot) => {
          const { gender, id_course, role, name, start_course } = docSnapshot.data();

          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const usersRef = collection(database, "users");
            const newUser = {
              email: email,
              gender: gender,
              id_course: id_course,
              role: role,
              name: name,
              start_course: start_course,
            };
            try {
              const userDocRef = doc(usersRef, uid);
              await setDoc(userDocRef, {
                uid: uid,
                ...newUser,
              });
              updateProfile(auth.currentUser!, {
                displayName: profileName,
              })
                .then(() => {
                  // Profile updated!
                  // ...
                })
                .catch((error) => {
                  // An error occurred
                  console.log(error);
                });
              (e.target as HTMLFormElement).reset();
              // await signOut(auth);
            } catch (e: any) {
              console.dir(e);
              console.log(usersRef.path);
              setError(firebaseErrors[e.code]);
            }
            navigate("/signin");
          } catch (e: any) {
            console.dir(e);
            setError(firebaseErrors[e.code]);
          }
        });
      } else {
        setError("E-mail, nie moze zostać zrejestrowany. Jeśli opłaciłeś kurs, skontaktuj się z działem Sprzedaż. ");
      }
    } catch (e: any) {
      setError("Wystąpił błąd podczas weryfikowania e-mail.");
      console.log(e.message);
    }
  };

  return (
    <>
      <Cards>
        <Card2>
          <ImgMain src={imgProgrammer} alt="programista"></ImgMain>
        </Card2>
        <Card>
          <LogoImg src={imgLogo} alt="logo"></LogoImg>

          <LogoName>
            <b>GO!</b> onBoard
          </LogoName>
          <NamePage>Zarejestruj się</NamePage>
          <FormSign onSubmit={handleSubmit}>
            <div>
              <Label>Imię</Label>
              <br />
              <Input onChange={(e) => setProfileName(e.target.value)} type="name" placeholder="Wpisz swóje imię" />
            </div>
            <div>
              <Label>Email</Label>
              <br />
              <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Wpisz swój email" />
            </div>
            <div>
              <Label>Hasło</Label>
              <br />
              <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Wpisz swoje hasło" />
            </div>
            <TextString>{error}</TextString>
            <div>
              <Button type="submit">Zarejestruj</Button>
            </div>
          </FormSign>
          <div>
            <LinkName>
              <Link to="/signin">Logowanie</Link>
            </LinkName>
            <LinkName>
              <a href="/signpassword">Nie pamiętam hasła</a>
            </LinkName>
          </div>
        </Card>
      </Cards>
    </>
  );
};
