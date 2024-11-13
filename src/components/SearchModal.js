import React from 'react';
import SearchBar from './SearchBar';

const Header = () => {
    const openModal = () => {
        document.getElementById('my_modal_2').showModal();
    };

    return (
        <header>
            {/* Bouton d'ouverture de la modal */}
            <button className="btn" onClick={openModal}>Rechercher</button>

            {/* Modal de recherche */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Recherche de Cocktails</h3>
                    <SearchBar />
                </div>
                {/* Clic à l'extérieur pour fermer */}
                <form method="dialog" className="modal-backdrop">
                    <button>Fermer</button>
                </form>
            </dialog>
        </header>
    );
};

export default Header;
