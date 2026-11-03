import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS } from '../constants/theme';
import { Button } from '../components/common/Button';

export const HelpCenterScreen = () => {
  const {
    setCurrentScreen,
    supportTickets,
    createSupportTicket,
    rideHistory,
  } = useApp();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketCreatedSuccess, setTicketCreatedSuccess] = useState(false);

  // Last ride data from context or default matching image
  const lastRide = rideHistory?.[0] || {
    drop: 'Nangal Dewat, Sector D',
    dateText: '26 Oct 2026 • 01:07 PM',
    fare: 0,
    status: 'Cancelled',
    vehicleName: 'Bike',
  };

  const helpTopics = [
    {
      id: 'fare',
      title: 'Ride fare related Issues',
      iconType: 'scooter',
      color: '#D97706',
      bgColor: '#FEF3C7',
      faqs: [
        'I was charged extra fare / surge fee',
        'Discount coupon was not applied',
        'Captain asked for extra cash',
        'Duplicate deduction from UPI / Wallet',
      ],
    },
    {
      id: 'captain',
      title: 'Captain and Vehicle related issues',
      iconType: 'helmet',
      color: '#CA8A04',
      bgColor: '#FEF9C3',
      faqs: [
        'Vehicle was different from app details',
        'Captain was driving recklessly or speeding',
        'Captain refused to start ride or asked to cancel',
        'Captain behaved unprofessionally',
      ],
    },
    {
      id: 'pass_payment',
      title: 'Pass and Payment related Issues',
      iconType: 'cash',
      color: '#16A34A',
      bgColor: '#DCFCE7',
      faqs: [
        'Bykse Pass not working on ride',
        'Money deducted but wallet not recharged',
        'Refund not credited back to bank account',
        'Unable to add new payment method',
      ],
    },
    {
      id: 'parcel',
      title: 'Parcel Related Issues',
      iconType: 'parcel',
      color: '#EA580C',
      bgColor: '#FFEDD5',
      faqs: [
        'Package delayed or captain not reachable',
        'Package damaged during delivery transit',
        'Wrong OTP or delivery confirmation issue',
        'Item weight or size dispute with captain',
      ],
    },
    {
      id: 'other',
      title: 'Other Topics',
      iconType: 'other',
      color: '#475569',
      bgColor: '#F1F5F9',
      faqs: [
        'Forgot an item in the ride',
        'Unable to update profile phone or email',
        'Safety incident or emergency reporting',
        'Account deactivated or login errors',
      ],
    },
  ];

  const filteredTopics = helpTopics.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const handleSubmitTicket = () => {
    if (!ticketDescription.trim()) return;

    createSupportTicket({
      category: selectedTopic ? selectedTopic.title : 'General Help',
      rideId: 'BYK-84920',
      issue: selectedTopic ? selectedTopic.title : 'Customer Support Request',
      description: ticketDescription.trim(),
    });

    setTicketCreatedSuccess(true);
    setTicketDescription('');
    setTimeout(() => {
      setTicketCreatedSuccess(false);
      setShowCreateTicketModal(false);
      setSelectedTopic(null);
    }, 1500);
  };

  // Render graphic icon for each topic matching Image
  const renderTopicIcon = (type) => {
    switch (type) {
      case 'scooter':
        return (
          <View style={[styles.topicIconBadge, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="bicycle" size={20} color="#D97706" />
          </View>
        );
      case 'helmet':
        return (
          <View style={[styles.topicIconBadge, { backgroundColor: '#FEF9C3' }]}>
            <Ionicons name="shield-checkmark" size={19} color="#CA8A04" />
          </View>
        );
      case 'cash':
        return (
          <View style={[styles.topicIconBadge, { backgroundColor: '#DCFCE7' }]}>
            <Ionicons name="cash" size={20} color="#16A34A" />
          </View>
        );
      case 'parcel':
        return (
          <View style={[styles.topicIconBadge, { backgroundColor: '#FFEDD5' }]}>
            <Ionicons name="cube" size={19} color="#EA580C" />
          </View>
        );
      case 'other':
      default:
        return (
          <View style={[styles.topicIconBadge, { backgroundColor: '#F1F5F9' }]}>
            <Ionicons name="settings" size={19} color="#475569" />
          </View>
        );
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header matching Image */}
      <View
        style={[
          styles.headerRow,
          { paddingTop: Math.max(insets.top, StatusBar.currentHeight || 24) + 12 },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => setCurrentScreen('PROFILE')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Help</Text>

        {/* Tickets Pill Button on Right (Image) */}
        <TouchableOpacity
          style={styles.ticketsPillBtn}
          onPress={() => setShowTicketsModal(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="receipt-outline" size={17} color="#0F172A" />
          <Text style={styles.ticketsPillText}>Tickets</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Your last ride (Image) */}
        <Text style={styles.sectionHeading}>Your last ride</Text>

        <View style={styles.lastRideCard}>
          {/* Top Ride Details Row */}
          <View style={styles.lastRideTopRow}>
            {/* Bike icon */}
            <View style={styles.rideBikeIconBox}>
              <Ionicons name="bicycle" size={28} color="#0F172A" />
            </View>

            {/* Ride Address, Date & Status */}
            <View style={styles.rideInfoCol}>
              <Text style={styles.rideAddressText}>
                {lastRide.drop || 'Nangal Dewat, Sector D'}
              </Text>
              <Text style={styles.rideDateTimeText}>
                {lastRide.dateText || '26 Oct 2026 • 01:07 PM'}
              </Text>
              <Text style={styles.rideFareStatusText}>
                ₹{lastRide.fare ?? 0} • {lastRide.status || 'Cancelled'}
              </Text>
            </View>
          </View>

          {/* Thin Divider inside Card */}
          <View style={styles.cardDivider} />

          {/* Bottom "Full Ride history" Row */}
          <TouchableOpacity
            style={styles.fullHistoryRow}
            activeOpacity={0.7}
            onPress={() => setCurrentScreen('RIDE_HISTORY')}
          >
            <Ionicons name="time-outline" size={20} color="#0F172A" />
            <Text style={styles.fullHistoryText}>Full Ride history</Text>
            <Ionicons name="chevron-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Section 2: Help topics (Image) */}
        <Text style={styles.sectionHeading}>Help topics</Text>

        <View style={styles.helpTopicsCard}>
          {/* Search Help Topics Input (Image) */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#0F172A" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Help Topics"
              placeholderTextColor="#475569"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close" size={18} color="#64748B" />
              </TouchableOpacity>
            )}
          </View>

          {/* 5 Topic Rows with Dividers */}
          {filteredTopics.map((topic, index) => (
            <React.Fragment key={topic.id}>
              <TouchableOpacity
                style={styles.topicRow}
                activeOpacity={0.65}
                onPress={() => handleSelectTopic(topic)}
              >
                {renderTopicIcon(topic.iconType)}
                <Text style={styles.topicTitleText}>{topic.title}</Text>
                <Ionicons name="chevron-forward" size={18} color="#0F172A" />
              </TouchableOpacity>
              {index < filteredTopics.length - 1 && <View style={styles.topicDivider} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* Topic Detail & FAQs Modal */}
      <Modal
        visible={!!selectedTopic}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedTopic(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { maxHeight: '85%' }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeading}>{selectedTopic?.title}</Text>
              <TouchableOpacity onPress={() => setSelectedTopic(null)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.faqSubtitle}>Common issues & resolutions:</Text>
              {selectedTopic?.faqs.map((faq, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.faqItemRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    setTicketDescription(`Issue: ${faq}`);
                    setShowCreateTicketModal(true);
                  }}
                >
                  <Ionicons name="help-circle-outline" size={18} color="#64748B" />
                  <Text style={styles.faqItemText}>{faq}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                </TouchableOpacity>
              ))}

              <View style={styles.needMoreHelpBox}>
                <Text style={styles.needMoreHelpText}>
                  Still facing an issue? Raise a support ticket directly with our team.
                </Text>
                <TouchableOpacity
                  style={styles.raiseTicketBtn}
                  onPress={() => setShowCreateTicketModal(true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.raiseTicketBtnText}>Raise a Ticket</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Create Support Ticket Modal */}
      <Modal
        visible={showCreateTicketModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateTicketModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeading}>Submit Support Ticket</Text>
              <TouchableOpacity onPress={() => setShowCreateTicketModal(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            {ticketCreatedSuccess ? (
              <View style={{ alignItems: 'center', paddingVertical: 24 }}>
                <Ionicons name="checkmark-circle" size={48} color="#16A34A" />
                <Text style={styles.ticketSuccessTitle}>Ticket Submitted Successfully!</Text>
                <Text style={styles.ticketSuccessSub}>
                  Our 24x7 support captain is reviewing your issue. You can track status in Tickets.
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.inputLabel}>Category</Text>
                <Text style={styles.categoryBadgeText}>
                  {selectedTopic ? selectedTopic.title : 'General Support'}
                </Text>

                <Text style={[styles.inputLabel, { marginTop: 14 }]}>
                  Describe your problem
                </Text>
                <TextInput
                  style={[styles.modalInput, { height: 90, textAlignVertical: 'top' }]}
                  placeholder="Explain what happened in detail..."
                  placeholderTextColor="#94A3B8"
                  multiline
                  value={ticketDescription}
                  onChangeText={setTicketDescription}
                />

                <Button
                  title="Submit Ticket"
                  onPress={handleSubmitTicket}
                  variant="danger"
                  size="md"
                  style={{ marginTop: 20, backgroundColor: '#DC2626' }}
                  textStyle={{ color: '#FFFFFF', fontWeight: '800' }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Tickets List Modal */}
      <Modal
        visible={showTicketsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTicketsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { maxHeight: '85%' }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeading}>My Support Tickets</Text>
              <TouchableOpacity onPress={() => setShowTicketsModal(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {supportTickets.length === 0 ? (
                <View style={{ alignItems: 'center', paddingVertical: 32 }}>
                  <Ionicons name="receipt-outline" size={44} color="#94A3B8" />
                  <Text style={styles.noTicketsTitle}>No active support tickets</Text>
                  <Text style={styles.noTicketsSub}>
                    Any tickets you raise for ride or refund issues will appear here.
                  </Text>
                </View>
              ) : (
                supportTickets.map((tkt) => (
                  <View key={tkt.id} style={styles.ticketCard}>
                    <View style={styles.ticketCardHeader}>
                      <Text style={styles.ticketIdBadge}>{tkt.id}</Text>
                      <View
                        style={[
                          styles.ticketStatusTag,
                          tkt.status === 'Resolved'
                            ? { backgroundColor: '#DCFCE7' }
                            : { backgroundColor: '#FEF3C7' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.ticketStatusTagText,
                            tkt.status === 'Resolved'
                              ? { color: '#16A34A' }
                              : { color: '#B45309' },
                          ]}
                        >
                          {tkt.status}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.tktCategory}>{tkt.category}</Text>
                    <Text style={styles.tktIssue}>{tkt.issue}</Text>
                    <Text style={styles.tktDesc}>{tkt.description}</Text>

                    {tkt.resolution && (
                      <View style={styles.tktResolutionBox}>
                        <Ionicons name="checkmark-circle" size={15} color="#16A34A" />
                        <Text style={styles.tktResolutionText}>{tkt.resolution}</Text>
                      </View>
                    )}
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  ticketsPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
  },
  ticketsPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },

  /* Last Ride Card (Image) */
  lastRideCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  lastRideTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rideBikeIconBox: {
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rideInfoCol: {
    flex: 1,
    marginLeft: 14,
  },
  rideAddressText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  rideDateTimeText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
  },
  rideFareStatusText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  fullHistoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fullHistoryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    marginLeft: 12,
  },

  /* Help Topics Card (Image) */
  helpTopicsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    paddingBottom: 4,
  },
  searchContainer: {
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    height: 48,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 0,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  topicIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  topicTitleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
  },
  topicDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 68,
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 8,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    paddingRight: 10,
  },
  faqSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 12,
  },
  faqItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 10,
  },
  faqItemText: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
    lineHeight: 20,
  },
  needMoreHelpBox: {
    marginTop: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  needMoreHelpText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 12,
  },
  raiseTicketBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  raiseTicketBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  ticketSuccessTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 10,
  },
  ticketSuccessSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },

  /* Tickets list styles */
  noTicketsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 10,
  },
  noTicketsSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 20,
  },
  ticketCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ticketCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketIdBadge: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  ticketStatusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ticketStatusTagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tktCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  tktIssue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  tktDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  tktResolutionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  tktResolutionText: {
    fontSize: 12,
    color: '#166534',
    fontWeight: '600',
    flex: 1,
  },
});
