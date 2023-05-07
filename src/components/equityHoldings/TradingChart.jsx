import { connect } from "react-redux";
import { useEffect, useRef } from "react";
import { Modal } from "antd";

let promise;

const TradingViewWidget = ({ selectedInstrumentIdentifier = "", darkMode }) => {
  const onLoadScriptRef = useRef();

  function createWidget() {
    if (document.getElementById("tradingview-widget") && "TradingView" in window) {
      new window.TradingView.widget({
        autosize: true,
        symbol: selectedInstrumentIdentifier,
        interval: "D",
        timezone: "Etc/UTC",
        theme: darkMode ? "dark" : "",
        style: "1",
        locale: "in",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview-widget",
      });
    }
  }

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!promise) {
      promise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    promise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => (onLoadScriptRef.current = null);
  }, []);

  return <div id="tradingview-widget" style={{ height: "70vh" }} />;
};

const TradingChart = ({ isOpen, setVisible, selectedInstrumentIdentifier, darkMode }) => {
  return (
    <Modal title="Trading Chart" open={isOpen} footer={[]} onCancel={() => setVisible(false)} width={"80%"}>
      <TradingViewWidget selectedInstrumentIdentifier={selectedInstrumentIdentifier} darkMode={darkMode} />
    </Modal>
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(TradingChart);
