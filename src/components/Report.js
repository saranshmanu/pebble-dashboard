import { connect } from "react-redux";
import { useEffect, cloneElement } from "react";
import LogoImage from "../images/logo-dark.png";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { formatAmount, formatPercentage } from "../utils/commonFunctions";
import useHolding from "../hooks/holding";

const Report = ({ children, holdingStats, holdingData }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    section: {
      margin: "30px",
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: "1px",
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: "20px",
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol12P5: {
      width: "12.5%",
      borderStyle: "solid",
      borderWidth: "1px",
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol50P0: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: "1px",
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: "5px",
      marginTop: "5px",
      fontSize: "6px",
    },
    subheading: {
      margin: "10px 0 20px 0",
    },
    bodyText: {
      fontSize: "13px",
      marginBottom: "20px",
    },
    companyLogo: {
      display: "block",
      height: "auto",
      width: "auto",
      maxHeight: "100px",
      maxWidth: "106px",
    },
  });

  const [{ refresh }] = useHolding();
  useEffect(() => {
    refresh();
  }, []);

  const document = (
    <Document>
      <Page size="LEGAL" orientation="potrait" style={styles.page}>
        <View style={styles.section}>
          {/* Company Logo */}
          <Image style={styles.companyLogo} src={LogoImage} />
        </View>
        <View style={styles.section}>
          {/* Introduction Section */}
          <Text style={styles.bodyText}>Hey,</Text>
          <Text style={styles.bodyText}>
            This is a system generated advice, and hence does not require a signature.
          </Text>
          <Text style={styles.bodyText}>Please find below your investment holding summary.</Text>
          {/* Investment Summary Section */}
          <Text style={styles.subheading}>Investment Summary</Text>
          <View style={styles.table}>
            {[
              ["Statement Date", new Date().toLocaleDateString()],
              ["Average Interest Rate", formatPercentage(holdingStats?.averageInterestRate)],
              ["Principal Amount", formatAmount(holdingStats?.totalInvestment, true)],
              ["Accumulated Interest", formatAmount(holdingStats?.accumulatedInterest, true)],
              ["Net Value", formatAmount(holdingStats?.netAmount, true)],
            ].map((value) => (
              <View style={styles.tableRow}>
                <View style={styles.tableCol50P0}>
                  <Text style={styles.tableCell}>{value[0]}</Text>
                </View>
                <View style={styles.tableCol50P0}>
                  <Text style={styles.tableCell}>{value[1]}</Text>
                </View>
              </View>
            ))}
          </View>
          {/* Holding Statement Section */}
          <Text style={styles.subheading}>Holding Statement</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {[
                "Institution",
                "Principal",
                "Interest Rate (in %)",
                "Date",
                "Compound Frequency",
                "Duration (in days)",
                "Current Value",
                "Maturity Amount",
              ].map((column) => (
                <View style={styles.tableCol12P5}>
                  <Text style={styles.tableCell}>{column}</Text>
                </View>
              ))}
            </View>
            {holdingData.map((investment) => (
              <View style={styles.tableRow}>
                {[
                  investment.institution,
                  formatAmount(investment.principal, true),
                  formatPercentage(investment.interestRate),
                  investment.investmentDate,
                  investment.compoundFrequency,
                  investment.duration,
                  formatAmount(investment.currentValue, true),
                  formatAmount(investment.maturityAmount, true),
                ].map((value) => (
                  <View style={styles.tableCol12P5}>
                    <Text style={styles.tableCell}>{value}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <View>
            {/* Footer Section */}
            <Text style={styles.bodyText}>Regards,</Text>
            <Text style={styles.bodyText}>Pebble Asset Management</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={<>{document}</>} fileName="Investment Summary.pdf">
      {({ blob, url, loading, error }) => {
        return cloneElement(children, { disabled: loading });
      }}
    </PDFDownloadLink>
  );
};
export default connect(
  (state) => ({
    holdingStats: state.holdings.summary,
    holdingData: state.holdings.holdings,
  }),
  () => ({})
)(Report);
