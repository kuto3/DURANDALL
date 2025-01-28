"use client"

import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import Matter from 'matter-js';

const BeanMachine = () => {
    const [paused, setPaused] = useState(false);
    const [marblesize, setMarblesize] = useState(12);
    const [marblefriction, setMarblefriction] = useState(0.1);
    const [gravity, setGravity] = useState(1);
    const [tempboxes, setTempboxes] = useState([]);
    const [marblecount, setMarblecount] = useState(0);

    useEffect(() => {
        const setup = () => {
            // Initialisation de Matter.js et p5.js
            // Vous pouvez copier ici le code de la fonction setup() de votre script original
        };

        const draw = () => {
            // Fonction de dessin
            // Vous pouvez copier ici le code de la fonction draw() de votre script original
        };

        const sketch = new p5((p) => {
            p.setup = setup;
            p.draw = draw;
        }, 'canvasbox');

        return () => {
            sketch.remove();
        };
    }, []);

    const handleReset = () => {
        // Logique pour réinitialiser
    };

    const handlePause = () => {
        setPaused(!paused);
        // Logique pour mettre en pause/reprendre
    };

    return (
        <div className="container">
            <nav className="navbar bg-body-tertiary mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img
                            src="/normal-distribution 32.png"
                            alt="Logo"
                            width="32"
                            height="32"
                            className="d-inline-block align-text-top"
                        />
                        Bean Machine
                    </a>
                </div>
            </nav>

            <div className="row">
                <div className="col-lg-3 col-12">
                    <div className="card">
                        <div className="card-body">
                            <form action="#" className="">
                                <div className="mb-3">
                                    <label htmlFor="marblesizeinput" className="form-label">Marble size</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="marblesizeinput"
                                        value={marblesize}
                                        onChange={(e) => setMarblesize(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="marblefrictioninput" className="form-label">Marble friction</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="marblefrictioninput"
                                        value={marblefriction}
                                        onChange={(e) => setMarblefriction(e.target.value)}
                                        step="0.1"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gravityinput" className="form-label">Gravity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="gravityinput"
                                        value={gravity}
                                        onChange={(e) => setGravity(e.target.value)}
                                        step="0.1"
                                    />
                                </div>
                            </form>

                            <ul className="list-group mt-5">
                                <li className="list-group-item">
                                    Marble count: <span id="marblecount">{marblecount}</span>
                                </li>
                                <li className="list-group-item">
                                    Peg count: <span id="pegcount">0</span>
                                </li>
                            </ul>

                            <div className="d-grid gap-2 mt-5">
                                <button id="resetbutton" className="btn btn-primary" type="button" onClick={handleReset}>
                                    Reset
                                </button>
                                <button id="pausebutton" className="btn btn-primary" type="button" onClick={handlePause}>
                                    {paused ? 'Resume' : 'Pause'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <a href="https://sahandbabali.com/">sahandbabali.com</a>
                </div>
                <div className="col-lg-9 col-12 text-center">
                    <div id="canvasbox"></div>
                </div>
            </div>
        </div>
    );
};

export default BeanMachine;