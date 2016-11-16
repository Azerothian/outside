import App from "./app";
import ReactDOM from "react-dom";
import React from "react";

import DataStore from "web/os/store";
import UiStore from "web/ui/store";
import Bootstrap from "web/ui/lib/bootstrap";
import Formsy from "web/ui/lib/formsy";
import FormsyMaterialUi from "web/ui/lib/formsy-material-ui";
// import Grid from "web/ui/lib/bootstrap/grid";
// import Row from "web/ui/lib/bootstrap/row";
// import Col from "web/ui/lib/bootstrap/col";

// import Formsy from "web/ui/lib/formsy";


// class RenderNodeId extends React.Component {
//   render() {
//     return (<div>
//       {`Id: ${this.props.osNode.id.toString()}`}<br/>
//       {`ParentId: ${this.props.osNode.parentId.toString()}`}
//     </div>);
//   }
// }

// RenderNodeId.propTypes = {
//   osNode: React.PropTypes.object.isRequired,
// };

// RenderNodeId.displayName = "RenderNodeId";

const store = new DataStore();
store.ui = new UiStore(store);

store.ui.register(Bootstrap);
store.ui.register(Formsy);
store.ui.register(FormsyMaterialUi);

// store.register(Grid);
// store.register(Row);
// store.register(Col);

// const row = store.top.create(Grid, {fluid: true}).create(Row);
// row.create(Col, {xs: 6});
// row.create(Col, {xs: 6}).create(RenderNodeId);



store.enableDesigner = true;
ReactDOM.render(<App store={store}/>, document.getElementById("react-container"));
