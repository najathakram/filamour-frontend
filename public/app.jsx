// ===== ROUTER =====
const Router = () => {
  const route = useHashRoute();
  let page;
  if (route === "/" || route === "") page = <HomePage/>;
  else if (route.startsWith("/shop")) page = <ShopPage/>;
  else if (route.startsWith("/product/")) page = <ProductPage slug={route.split("/")[2]}/>;
  else if (route === "/our-story") page = <OurStoryPage/>;
  else if (route === "/artisans") page = <ArtisansPage/>;
  else if (route === "/gift-guide") page = <GiftGuidePage/>;
  else if (route === "/bespoke") page = <BespokePage/>;
  else if (route === "/size-guide") page = <SizeGuidePage/>;
  else if (route === "/care-guide") page = <CareGuidePage/>;
  else if (route === "/faq") page = <FaqPage/>;
  else if (route === "/shipping") page = <ShippingPage/>;
  else if (route === "/contact") page = <ContactPage/>;
  else if (route === "/lookbook") page = <LookbookPage/>;
  else if (route === "/cart") page = <CartPage/>;
  else if (route === "/checkout") page = <CheckoutPage/>;
  else if (route === "/wishlist") page = <WishlistPage/>;
  else if (route === "/journal") page = <JournalPage/>;
  else if (route.startsWith("/dashboard")) page = <Dashboard route={route}/>;
  else page = <HomePage/>;
  // Hide public chrome on dashboard
  return page;
};

const App = () => {
  const [ccy, setCcy] = React.useState("LKR");
  const route = useHashRoute();
  const isDash = route.startsWith("/dashboard");
  return (
    <CurrencyContext.Provider value={{ ccy, setCcy }}>
      <ShopProvider>
        {!isDash && <Nav/>}
        <main data-screen-label={window.location.hash || "/"}>
          <Router/>
        </main>
        {!isDash && <Footer/>}
        <ToastStack/>
      </ShopProvider>
    </CurrencyContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
