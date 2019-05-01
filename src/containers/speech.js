// import './App.css';
// import React from 'react';
// import { Route } from 'react-router-dom';
// import UserPage from './pages/UserPage';
// import NewJournal from './pages/NewJournal';
// import Navbar from './containers/navbar';
// import JournalEntry from './containers/JournalEntry';
// import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

// class App extends React.Component {
// constructor() {
//     super();
//     this.state = {
//       text: ''
//     }
//   }

//   onListen() {
//     fetch('http://localhost:3002/api/speech-to-text/token')
//       .then(function (response) {
//         return response.text();
//       }).then((token) => {
//         console.log('token is', token)
//         var stream = recognizeMic({
//           token: token, // use `access_token` as the parameter name if using an RC service
//           objectMode: true, // send objects instead of text
//           extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
//           format: false // optional - performs basic formatting on the results such as capitals an periods
//         });
//         stream.on('data', (data) => {
//           this.setState({
//             text: data.alternatives[0].transcript
//           })
//           console.log(data);
//         });
//         stream.on('error', function (err) {
//           console.log(err);
//         });
//         // document.querySelector('#stop').onclick = stream.stop.bind(stream);
//       }).catch(function (error) {
//         console.log(error);
//       });
//   }

//   render() {
//     return (
//       <div>
//         <Navbar />
//         <UserPage />

//         {/* Routes */}
//         <Route path="/journals/new" component={NewJournal} />
//         <Route path="/journals/:id" component={JournalEntry} />

//         <button onClick={this.onListen.bind(this)}>Record journal</button>
//         <div style={{ fontSize: '40px' }}>{this.state.text}</div>
//       </div>

//     );
//   }
// }

// export default App;