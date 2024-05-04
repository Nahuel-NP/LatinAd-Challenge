import { flushSync } from 'react-dom';
import { useNavigate } from "react-router-dom";


const useViewTransition = () => {

  const navigate = useNavigate()

  const handletransition = (route: string) => {

    //@ts-ignore
    if (!document.startViewTransition) {
      navigate(route)
      return;
    }
    //@ts-ignore
    document.startViewTransition(() => {
      //cambios de forma sincrona en el DOM
      flushSync(() => navigate(route))
    })


  }
  return {
    handletransition
  }
}

export default useViewTransition;