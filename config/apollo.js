import { ApolloClient,createHttpLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink ({
    // uri:'http://localhost:4000/',
    uri:'https://fast-ravine-09676.herokuapp.com/'
});

const authLink = setContext ((_,{headers})=>{

    const token = localStorage.getItem('token');
    // console.log(`El token es: ${token}`);

    // if(!token) {
    //     router.push('/inicio')
    // }

    return{
        headers:{
            ...headers,
            miPropioHeader:"¡Hola!",
            authorization: token ? `Bearer ${token}` : '',
        }
    }
})

const cliente = new ApolloClient({
    connectToDevTools:true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
        // new HttpLink({
        // uri:'http://localhost:4000/',
    });

export default cliente;