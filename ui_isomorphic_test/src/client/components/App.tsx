import { Component, linkEvent } from 'inferno';
import * as fetch from 'isomorphic-fetch';

interface IState {
  inc: number;
  city: string;
}

interface IProps {}

export function fetchedData() {
  return fetch('https://am.i.mullvad.net/city')
  .then(res => res.text())
  /* .then(data => { */
  /*   this.state.city = data; */
  /*   this.setState(this.state); */
  /* }) */
  .catch(error => console.error(error));
}

export default class App extends Component<IProps, IState> {
   constructor(props: IProps) {
      super(props);
      fetchedData().then((data) => {
        console.log(data);
        this.state = {inc: 0, city: data};
        this.setState(this.state);
      });
      /* this.state = {inc: 0, city: null}; */
      /* this.fetchClick(this, null); */
   }
   
   public render() {
     return (
       <>
{ this.state && 
  <div>
    Inc: {this.state.inc}
    city: {this.state.city}
  </div>
}
         <button onClick={linkEvent(this, this.fetchClick)}>Fetch test</button>
       </>
      );
   }

   fetchThing() {
   }

   fetchClick(i: App, event: any) {
     i.fetchThing();
   }
}
