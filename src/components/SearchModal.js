import SearchBar from './SearchBar';

const Header = () => {
    const openModal = () => {
        document.getElementById('my_modal_2').showModal();
    };

    return (
        <header>
            <button className="btn" onClick={openModal}>Rechercher</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Recherche de Cocktails</h3>
                    <SearchBar />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Fermer</button>
                </form>
            </dialog>
        </header>
    );
};

export default Header;
