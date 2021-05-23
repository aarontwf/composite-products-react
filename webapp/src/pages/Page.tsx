import React from "react";
import NavBar from "../components/NavBar";

class Page extends React.Component {
  render() {
    return (
      <div>
        <NavBar title="CartonCloud" />

        <main>
          <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

export default Page;
