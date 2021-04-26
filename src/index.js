import React from "react";
import { render } from "react-dom";
import {
      ApolloClient,
      InMemoryCache,
      ApolloProvider,
      useQuery,
      gql
} from "@apollo/client";

const client = new ApolloClient({
      uri: "https://api.spacex.land/graphql/",
      cache: new InMemoryCache()
});

const GET_LAUNCHES_INFO = gql`
      query getLaunches {
          launches(limit: 5) {
              launch_date_utc
              launch_success
              rocket {
                  rocket_name
              }
              links {
                  video_link
              }
              details
          }
      }
      
      
      
`;

function Launches(){
      const {loading, error, data} = useQuery(GET_LAUNCHES_INFO);
      if(loading) return 'Loading ..';
      if(error) return `Error! ${error.message}`;

     console.log(data);
      return(
            <div>
                  {JSON.stringify(data.launches)}
            </div>
      ) ;
}
// function ExchangeRates() {
//       const { loading, error, data } = useQuery(gql`
//           {
//               rates(currency: "USD") {
//                   currency
//                   rate
//               }
//           }
//       `);
//
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;
//
//       return data.rates.map(({ currency, rate }) => (
//             <div key={currency}>
//                   <p>
//                         {currency}: {rate}
//                   </p>
//             </div>
//       ));
// }

function App() {
      return (
            <ApolloProvider client={client}>
                  <div>
                        <h2>My first Apollo app 🚀</h2>
                        <Launches />
                        {/*<ExchangeRates />*/}
                  </div>
            </ApolloProvider>
      );
}

render(<App />, document.getElementById("root"));
