import ListHeader from "./components/ListHeader";
import { useEffect } from "react";
import { useState } from "react";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import Loading from "./components/Loader";
import { useCookies } from "react-cookie";
const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();

      setTasks(json);
    } catch (err) {}
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  });

  //Sort by date

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"📝 DAILY TASKS"} getData={getData} />
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
