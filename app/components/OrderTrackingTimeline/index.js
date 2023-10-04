/**
 *
 * OrderTrackingTimeline
 *
 */

import React, { Fragment, memo, useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import Moment from 'moment';
import Check from '../../assets/svg/checkTracking';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

export const styles = StyleSheet.create({
  checkElement: {
    width: Spacing.SCALE_40,
    height: Spacing.SCALE_40,
    borderRadius: Spacing.SCALE_20,
    borderWidth: 2,
    borderColor: '#fb4896',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.SCALE_10,
  },
  trackLine: {
    width: 2,
    height: Spacing.SCALE_50,
    backgroundColor: '#fb4896',
    left: Spacing.SCALE_19,
  },
  trackLineHalf: {
    width: 2,
    height: Spacing.SCALE_25,
    backgroundColor: '#fb4896',
    left: Spacing.SCALE_19,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //alignItems: 'center',
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  commande: {
    fontWeight: '500',
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: '#24378b',
  },
});

function CheckCircle(props) {
  return (
    <View style={styles.line}>
      <View style={[styles.checkElement, { borderColor: props?.validated ? '#fb4896' : '#e4e8ef' }]}>
        <Check width={24} height={24} fill={props.validated ? '#fb4896' : '#c0c9d9'} />
      </View>
      <Text style={[styles.commande, { color: props?.validated ? '#24378b' : '#c0c9d9' }]}>{props?.statusOrder}</Text>
    </View>
  );
}

function OrderTrackingTimeline(props) {
  // const [statusOrder, setStatusOrder] = React.useState(props.orderTracking.data.rows[0].Order.Status[0].valueStatus.fr);
  const [statusOrder, setStatusOrder] = React.useState(
    props?.statusList?.[0]?.fr ? props?.statusList?.[0]?.fr : props?.statusList,
  );

  useEffect(() => {
    sortByDate(props?.statusList);
  }, [props?.statusList]);

  const sortByDate = list =>
    [...list].sort((a, b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'));
  const precommande = props.intl.formatMessage({ id: 'app.components.OrderTrackingTimeLine.precommande' });
  const initiated = props.intl.formatMessage({ id: 'app.components.OrderTrackingTimeLine.initiated' });
  const beingProcessed = props.intl.formatMessage({ id: 'app.components.OrderTrackingTimeLine.beingProcessed' });
  const inDelivering = props.intl.formatMessage({ id: 'app.components.OrderTrackingTimeLine.inDelivering' });
  const complete = props.intl.formatMessage({ id: 'app.components.OrderTrackingTimeLine.complete' });
  const canceled = props.intl.formatMessage({ id: 'app.components.OrderTrackingTimeLine.canceled' });

  return (
    <View style={styles.container}>
      {statusOrder === 'précommandée' && (
        <>
          <Fragment>
            <CheckCircle statusOrder={precommande} validated />
            <View
              style={[styles.trackLine, { backgroundColor: statusOrder === 'précommandée' ? '#fb4896' : '#c0c9d9' }]}
            />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={initiated} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={beingProcessed} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={inDelivering} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={complete} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={canceled} />
          </Fragment>
        </>
      )}

      {statusOrder === 'initiée' && (
        <>
          <Fragment>
            <CheckCircle statusOrder={initiated} validated />
            <View style={[styles.trackLine, { backgroundColor: statusOrder === 'initiée' ? '#fb4896' : '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={beingProcessed} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={inDelivering} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={complete} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={canceled} />
          </Fragment>
        </>
      )}

      {statusOrder === 'en cours de traitement' && (
        <>
          <Fragment>
            <CheckCircle statusOrder={canceled} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={beingProcessed} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={inDelivering} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={complete} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={canceled} />
          </Fragment>
        </>
      )}

      {statusOrder === 'en cours de livraison' && (
        <>
          <Fragment>
            <CheckCircle statusOrder={initiated} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={beingProcessed} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={inDelivering} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={complete} />
            <View style={[styles.trackLine, { backgroundColor: '#c0c9d9' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={canceled} />
          </Fragment>
        </>
      )}

      {statusOrder === 'complète' && (
        <>
          <Fragment>
            <CheckCircle statusOrder={initiated} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={beingProcessed} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={inDelivering} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={complete} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={canceled} />
          </Fragment>
        </>
      )}

      {statusOrder === 'annulée' && (
        <>
          <Fragment>
            <CheckCircle statusOrder={initiated} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={beingProcessed} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={inDelivering} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={complete} validated />
            <View style={[styles.trackLine, { backgroundColor: '#fb4896' }]} />
          </Fragment>
          <Fragment>
            <CheckCircle statusOrder={canceled} validated />
          </Fragment>
        </>
      )}
    </View>
  );
}

OrderTrackingTimeline.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(OrderTrackingTimeline));
