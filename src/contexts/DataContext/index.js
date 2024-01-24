import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // erreur : ajout de last pour récupérer le dernière préstation
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const DataEvent = await api.loadData(); // Chargement des données
      setData(DataEvent);
      const events = DataEvent?.events.sort((evtA, evtB) => // Tri des événement
      new Date(evtA.date) < new Date(evtB.date) ? -1 : 1);
      setLast(events[0]); // Assignation du premier événement a setLast
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last // ajout de last afin qu'il soit disponible pour tout les composant enfants
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
