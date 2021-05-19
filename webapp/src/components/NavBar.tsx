import React from "react";

type NavBarProps = {
  title: string;
};

class NavBar extends React.Component<NavBarProps> {
  render() {
    return (
      <nav className="bg-gray-800">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            <h1 className="text-sm font-medium text-white select-none">
              {this.props.title}
            </h1>
          </div>
        </header>
      </nav>
    );
  }
}

export default NavBar;
