import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';


const App = () => {
    // Initialize state
    const [ projects, setProjects ] = useState([]);

    // Get projects
    useEffect(() => {
      fetch('/api/projects')
            .then(res => res.json())
            .then(projects => setProjects(projects));
    },[]);

    return (
        <div className="App">

            <h1>Hi, my name isn't Andy anymore</h1>
            <h3>I'm a developer</h3>

            <h4>Here are a few of my projects</h4>

            {
                projects.length ? (
                    projects.map((project) => (
                        // <div style={{padding: 10}} key={project.name}>
                        //     <p><b><a href={project.html_url}>{project.name}</a></b></p>
                        //     <p>{project.description}</p>
                        // </div>
                        <div style={{padding: 10}} key={project.name}>
                            <Button 
                                variant="contained"
                                href={project.html_url}>
                                {project.name}
                            </Button>
                        </div>
                    ))
                ) : (
                    <div>
                        Loading projects..
                    </div>
                )
            }
        </div>
    );
}

export default App;