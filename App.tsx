import React, { useState, useEffect } from 'react';
import { Product, CartItem, View, ProductOption } from './types';
import { PRODUCTS, GLOSSARY_ITEMS } from './constants';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeOption, setActiveOption] = useState<ProductOption | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);

  // State for the Contact Form
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Reset active option and quantity when selected product changes
  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.options && selectedProduct.options.length > 0) {
        setActiveOption(selectedProduct.options[0]);
      } else {
        setActiveOption(null);
      }
      setDetailQuantity(1);
    }
  }, [selectedProduct]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const addToCart = (product: Product, option?: ProductOption, quantityToAdd: number = 1) => {
    if (product.price === 'Bientôt disponible') return;

    setCart(prev => {
      const existing = prev.find(item =>
        item.id === product.id &&
        (!option || (item.selectedOption && item.selectedOption.label === option.label))
      );

      if (existing) {
        return prev.map(item =>
          (item.id === product.id && (!option || (item.selectedOption && item.selectedOption.label === option.label)))
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }

      const priceToUse = option ? option.price : product.price;
      const numericPrice = typeof priceToUse === 'string'
        ? parseFloat(priceToUse.replace(/[^0-9.]/g, ''))
        : priceToUse;

      return [...prev, {
        ...product,
        quantity: quantityToAdd,
        selectedOption: option,
        price: isNaN(numericPrice as number) ? 0 : numericPrice
      }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, optionLabel: string | undefined, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === cartItemId && (!item.selectedOption || item.selectedOption.label === optionLabel)) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (cartItemId: string, optionLabel?: string) => {
    setCart(prev => prev.filter(item =>
      !(item.id === cartItemId && (!optionLabel || item.selectedOption?.label === optionLabel))
    ));
  };

  const cartTotal = cart.reduce((sum: number, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return sum + (price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    const email = "info@espacenaturae.ca";
    const subject = "Nouvelle commande - Espace Naturaē";
    const itemsList = cart.map(item => {
      const itemPrice = typeof item.price === 'number' ? item.price : 0;
      return `- ${item.name}${item.selectedOption ? ` (${item.selectedOption.label})` : ''} x${item.quantity} : ${itemPrice}$ (Total: ${itemPrice * item.quantity}$)`;
    }).join('\n');

    const body = `Bonjour Espace Naturaē,\n\nJe souhaite passer la commande suivante :\n\n${itemsList}\n\nTotal : ${cartTotal}$\n\nCoordonnées client :\nNom :\nTéléphone :\nAdresse de livraison :\n\nMerci !`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = "info@espacenaturae.ca";
    const subject = `Contact: ${contactForm.subject || 'Demande de renseignement'}`;
    const body = `De: ${contactForm.firstName} ${contactForm.lastName}\nEmail: ${contactForm.email}\nTéléphone: ${contactForm.phone}\n\nMessage:\n${contactForm.message}`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const glossaryLetters = Array.from(new Set(GLOSSARY_ITEMS.map(i => i.name[0].toUpperCase()))).sort();
  const filteredGlossary = activeLetter
    ? GLOSSARY_ITEMS.filter(item => item.name[0].toUpperCase() === activeLetter)
    : GLOSSARY_ITEMS;

  const renderProductMedia = (mediaString: string, containerClass: string) => {
    if (mediaString.trim().startsWith('<iframe')) {
      const responsiveIframe = mediaString
        .replace(/width="[^"]*"/, 'width="100%"')
        .replace(/height="[^"]*"/, 'height="100%"');
      return (
        <div
          className={`${containerClass} overflow-hidden bg-gray-50 flex items-center justify-center`}
          dangerouslySetInnerHTML={{ __html: responsiveIframe }}
        />
      );
    }
    return <img src={mediaString} alt="Product" className={`${containerClass} object-cover`} />;
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero onExplore={() => setView('shop')} />
            <section className="max-w-7xl mx-auto px-4 py-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light serif text-eucalyptus mb-4 tracking-tight">Nos Essentiels</h2>
                <div className="w-16 h-[1px] bg-eucalyptus mx-auto mb-6"></div>
                <p className="text-gray-500 max-w-lg mx-auto font-light font-sans">Créés en petites quantités, avec des ingrédients naturels et respectueux de la peau, même les plus sensibles.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(p) => addToCart(p, undefined, 1)}
                    onViewDetails={(p) => { setSelectedProduct(p); setView('product'); }}
                  />
                ))}
              </div>
            </section>

            <section className="flex justify-center py-12 bg-ivory">
              <img
                src="/images/baume-infographic.jpg"
                alt="Composition des Baumes Naturaē"
                className="max-w-4xl w-full h-auto rounded shadow-sm opacity-90 hover:opacity-100 transition-opacity"
              />
            </section>

            <section className="bg-eucalyptus text-white py-24">
              <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-6xl font-light playfair display mb-12 italic leading-relaxed">
                  "Des ingrédients et formulations simples, qui se fondent naturellement à votre peau. C'est l'essence même de notre démarche."
                </h2>
                <p className="text-ivory/80 tracking-widest uppercase text-xs font-sans">Espace Naturaē - Fondé sur l'essentiel</p>
              </div>
            </section>
          </>
        );

      case 'shop':
        return (
          <section className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
            <h2 className="text-5xl font-light serif text-center mb-20 text-eucalyptus">La Boutique</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {PRODUCTS.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => addToCart(p, undefined, 1)}
                  onViewDetails={(p) => { setSelectedProduct(p); setView('product'); }}
                />
              ))}
            </div>
          </section>
        );

      case 'glossary':
        return (
          <section className="max-w-5xl mx-auto px-4 py-20 min-h-screen">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-light serif text-eucalyptus mb-4">Glossaire Botanique</h2>
              <div className="w-16 h-[1px] bg-eucalyptus mx-auto mb-8"></div>
              <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                Découvrez les bienfaits des trésors botaniques que nous sélectionnons avec soin pour vos rituels.
              </p>
            </div>

            <div className="mb-12 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveLetter(null)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-all border ${!activeLetter ? 'bg-eucalyptus text-white border-eucalyptus' : 'text-gray-400 border-gray-100 hover:border-gray-300'}`}
              >
                Tous
              </button>
              {glossaryLetters.map(letter => (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  className={`w-10 h-10 flex items-center justify-center text-xs tracking-widest uppercase transition-all border ${activeLetter === letter ? 'bg-eucalyptus text-white border-eucalyptus' : 'text-gray-400 border-gray-100 hover:border-gray-300'}`}
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="grid gap-8">
              {filteredGlossary.sort((a, b) => a.name.localeCompare(b.name)).map((item, idx) => (
                <div key={idx} className="bg-white p-8 border border-gray-50 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                    <h3 className="text-2xl font-light serif text-eucalyptus group-hover:italic transition-all">{item.name}</h3>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 font-sans italic">INCI: {item.inci}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light font-sans">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        );

      case 'product':
        if (!selectedProduct) { setView('shop'); return null; }
        const currentPriceLabel = activeOption ? activeOption.price : selectedProduct.price;
        const isAvailable = selectedProduct.price !== 'Bientôt disponible';

        return (
          <section className="max-w-7xl mx-auto px-4 py-20 min-h-[80vh]">
            <button onClick={() => setView('shop')} className="mb-12 flex items-center text-sm text-gray-500 hover:text-eucalyptus transition-colors uppercase tracking-widest font-sans font-bold">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              Retour
            </button>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {renderProductMedia(selectedProduct.image, "aspect-[4/5] w-full rounded")}
              <div className="flex flex-col h-full">
                <span className="text-eucalyptus tracking-widest uppercase text-xs mb-4 font-sans font-bold">{selectedProduct.category}</span>
                <h2 className="text-5xl font-light serif text-gray-900 mb-6 leading-tight">{selectedProduct.name}</h2>
                <p className="text-3xl text-eucalyptus font-light font-sans mb-8 tracking-tight">
                  {currentPriceLabel}{typeof currentPriceLabel === 'number' ? '$' : ''} {isAvailable && <span className="text-xs text-gray-400">CAD</span>}
                </p>

                {selectedProduct.options && selectedProduct.options.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xs tracking-widest uppercase font-semibold text-gray-900 mb-4 font-sans font-bold">Options disponibles</h4>
                    <div className="flex flex-wrap gap-4">
                      {selectedProduct.options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => setActiveOption(opt)}
                          className={`px-6 py-2 border text-sm font-sans transition-all ${activeOption?.label === opt.label
                              ? 'border-eucalyptus bg-eucalyptus text-white'
                              : 'border-gray-200 text-gray-600 hover:border-eucalyptus'
                            }`}
                        >
                          {opt.label} {opt.price !== selectedProduct.price && `- ${opt.price}$`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isAvailable && (
                  <div className="mb-10">
                    <h4 className="text-xs tracking-widest uppercase font-semibold text-gray-900 mb-4 font-sans font-bold">Quantité</h4>
                    <div className="flex items-center border border-gray-200 w-32 rounded overflow-hidden">
                      <button
                        onClick={() => setDetailQuantity(q => Math.max(1, q - 1))}
                        className="flex-1 py-2 hover:bg-gray-50 text-gray-500 transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-sm font-medium">{detailQuantity}</span>
                      <button
                        onClick={() => setDetailQuantity(q => q + 1)}
                        className="flex-1 py-2 hover:bg-gray-50 text-gray-500 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                <div className="prose prose-sm text-gray-600 mb-10 leading-relaxed font-sans max-w-none">
                  <p>{selectedProduct.description}</p>
                </div>
                <div className="mb-12">
                  <h4 className="text-xs tracking-widest uppercase font-semibold text-gray-900 mb-4 font-sans font-bold">Ingrédients Clés</h4>
                  <ul className="flex flex-wrap gap-2">
                    {selectedProduct.ingredients.map((ing, i) => (
                      <li key={i} className="text-xs bg-ivory border border-gray-200 px-3 py-1.5 rounded-full text-gray-700 italic font-sans">{ing}</li>
                    ))}
                  </ul>
                </div>

                {isAvailable ? (
                  <button
                    onClick={() => addToCart(selectedProduct, activeOption || undefined, detailQuantity)}
                    className="w-full bg-eucalyptus text-white py-5 tracking-[0.2em] uppercase text-xs font-sans font-bold hover:bg-gray-800 transition-all shadow-sm mb-4"
                  >
                    Ajouter au Panier
                  </button>
                ) : (
                  <div className="w-full bg-gray-100 text-gray-400 py-5 text-center tracking-[0.2em] uppercase text-xs font-sans font-bold mb-4 italic">
                    Épuisé / Bientôt disponible
                  </div>
                )}

                {selectedProduct.inci && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h4 className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 mb-2 font-sans font-bold">Liste INCI officielle</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans whitespace-pre-line">
                      INCI: {selectedProduct.inci}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'about':
        return (
          <section className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h2 className="text-6xl font-light serif text-eucalyptus mb-12">À Propos</h2>
            <div className="mx-auto text-gray-600 leading-loose font-light space-y-8 text-lg font-sans">
              <p>
                Chez Espace Naturaē, nous croyons que prendre soin de soi commence par des ingrédients aussi simples et bienveillants que ceux destinés à nourrir notre corps.
                Basée au Québec, c'est dans cet esprit qu'est née Espace Naturaē: un désir de redonner un sens aux soins quotidiens. La marque propose des formulations épurées à base d'ingrédients naturels. Conçus à la main en petites quantités, nos produits offrent fraîcheur, efficacité et une approche respectueuse du corps et de la peau.
              </p>
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200"
                alt="Nature québécoise sauvage"
                className="rounded-lg my-12 shadow-md"
              />

              {/* CONTACT SECTION */}
              <div className="mt-24 pt-24 border-t border-gray-100 text-left">
                <div className="text-center mb-16">
                  <h3 className="text-4xl font-light serif text-eucalyptus mb-4 tracking-tight">Contactez-nous</h3>
                  <div className="w-16 h-[1px] bg-eucalyptus mx-auto mb-6"></div>
                  <p className="text-gray-500 max-w-lg mx-auto font-light font-sans text-base">Vous avez des questions sur nos soins ? Nous serions ravis de vous aider.</p>
                </div>

                <form onSubmit={handleContactSubmit} className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Prénom</label>
                    <input
                      required
                      type="text"
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                      className="w-full bg-white border border-gray-100 p-4 text-sm focus:outline-none focus:border-eucalyptus transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Nom</label>
                    <input
                      required
                      type="text"
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                      className="w-full bg-white border border-gray-100 p-4 text-sm focus:outline-none focus:border-eucalyptus transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Email</label>
                    <input
                      required
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-white border border-gray-100 p-4 text-sm focus:outline-none focus:border-eucalyptus transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-white border border-gray-100 p-4 text-sm focus:outline-none focus:border-eucalyptus transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Sujet</label>
                    <input
                      required
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full bg-white border border-gray-100 p-4 text-sm focus:outline-none focus:border-eucalyptus transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-white border border-gray-100 p-4 text-sm focus:outline-none focus:border-eucalyptus transition-colors resize-none"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2 mt-4">
                    <button
                      type="submit"
                      className="w-full bg-eucalyptus text-white py-5 tracking-[0.3em] uppercase text-xs font-bold hover:bg-gray-800 transition-all shadow-md"
                    >
                      Envoyer le message
                    </button>
                  </div>
                </form>
              </div>

              <p className="mt-20">
              </p>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar
        currentView={view}
        setView={setView}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-ivory border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <h3 className="text-2xl font-light tracking-widest uppercase text-eucalyptus mb-6">Espace Naturaē</h3>
              <p className="text-gray-500 max-w-sm leading-relaxed font-light font-sans mb-2">
                Soins botaniques du Québec. Pureté. Artisanat. Équilibre.
              </p>
              <p className="text-xs text-eucalyptus font-bold tracking-widest mb-6">
                <a href="mailto:info@espacenaturae.ca" className="hover:underline">info@espacenaturae.ca</a>
              </p>
              <div className="flex items-center space-x-4">
                <a href="https://www.facebook.com/Espacenaturae/" target="_blank" rel="noopener noreferrer" className="text-eucalyptus hover:text-gray-900 transition-colors" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>
                </a>
                <a href="https://www.instagram.com/espacenaturae/" target="_blank" rel="noopener noreferrer" className="text-eucalyptus hover:text-gray-900 transition-colors" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.365-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.365-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xs tracking-widest uppercase font-semibold text-gray-900 mb-6 font-sans font-bold opacity-70">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button onClick={() => setView('shop')} className="hover:text-eucalyptus transition-colors font-sans font-bold">Boutique</button></li>
                <li><button onClick={() => setView('glossary')} className="hover:text-eucalyptus transition-colors font-sans font-bold">Glossaire Botanique</button></li>
                <li><button onClick={() => setView('about')} className="hover:text-eucalyptus transition-colors font-sans font-bold">L'Histoire</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs tracking-widest uppercase font-semibold text-gray-900 mb-6 font-sans font-bold opacity-70">Lieu</h4>
              <p className="text-sm text-gray-500 font-sans font-bold">Granby, Québec</p>
            </div>
          </div>
          <div className="text-center text-xs tracking-widest text-gray-400 uppercase pt-10 border-t border-gray-50 font-sans font-bold">
            &copy; 2025 Espace Naturaē. Prix en CAD $.
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="flex-1 py-10 px-6 overflow-y-auto">
                <div className="flex items-start justify-between mb-8">
                  <h2 className="text-2xl font-light serif text-eucalyptus uppercase tracking-wider">Votre Panier</h2>
                  <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-24 font-sans">
                    <p className="text-gray-400 italic">Votre panier est encore vide.</p>
                  </div>
                ) : (
                  <div className="space-y-8 font-sans">
                    {cart.map((item, idx) => (
                      <div key={`${item.id}-${item.selectedOption?.label || idx}`} className="flex space-x-4 pb-6 border-b border-gray-50">
                        {renderProductMedia(item.image, "w-20 h-24 rounded bg-gray-50")}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 serif text-lg">{item.name}</h4>
                          {item.selectedOption && (
                            <p className="text-[10px] text-eucalyptus uppercase font-bold tracking-widest mb-1">Format: {item.selectedOption.label}</p>
                          )}
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="flex items-center border border-gray-100 rounded bg-gray-50">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.selectedOption?.label, -1)}
                                className="px-2 py-0.5 text-gray-400 hover:text-eucalyptus"
                              >
                                -
                              </button>
                              <span className="text-xs px-1 min-w-[1.5rem] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.selectedOption?.label, 1)}
                                className="px-2 py-0.5 text-gray-400 hover:text-eucalyptus"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-sm text-gray-500">{item.price}$</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedOption?.label)}
                            className="text-[10px] text-red-400 hover:text-red-600 uppercase font-bold tracking-widest transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-100 py-8 px-8 bg-ivory font-sans">
                  <div className="flex justify-between text-xl text-gray-900 mb-8">
                    <p className="font-light serif">Sous-total</p>
                    <p className="font-bold">{cartTotal}$ <span className="text-xs text-gray-400">CAD</span></p>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-eucalyptus text-white py-5 tracking-[0.2em] uppercase text-xs font-bold hover:bg-gray-800 shadow-xl transition-all"
                  >
                    Commander par Email
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-6 uppercase tracking-widest leading-relaxed">
                    Les commandes sont finalisées par e-mail.<br />Paiement par virement Interac ou PayPal.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;