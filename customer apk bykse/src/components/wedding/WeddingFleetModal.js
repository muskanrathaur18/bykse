import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const WeddingFleetModal = ({
  visible,
  onClose,
  selectedDropPlace,
  dropAddress,
  selectedCarNameInput,
  setSelectedCarNameInput,
  weddingCarModels,
  selectedCarModel,
  setSelectedCarModel,
  carQuantity,
  setCarQuantity,
  selectedColorInput,
  setSelectedColorInput,
  weddingCarColors,
  selectedColor,
  setSelectedColor,
  customDate,
  setCustomDate,
  weddingDate,
  setWeddingDate,
  getPresetDates,
  selectedCar,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalBackdrop}
      >
        <TouchableOpacity
          style={styles.backdropDismiss}
          activeOpacity={1}
          onPress={() => onClose()}
        />

        <View style={styles.sheetContainer}>
          {/* Top Sheet Drag Indicator */}
          <View style={styles.dragBar} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header */}
            <View style={styles.headerRow}>
              <View style={styles.headerIconWrapper}>
                <MaterialCommunityIcons name="car-multiple" size={22} color="#D97706" />
              </View>

              <View style={styles.headerTextWrapper}>
                <Text style={styles.headerTitle}>Wedding Fleet Details</Text>
                <View style={styles.venueRow}>
                  <Ionicons name="location-sharp" size={13} color="#F59E0B" style={{ marginRight: 4 }} />
                  <Text style={styles.venueSubtitle} numberOfLines={1}>
                    {selectedDropPlace?.title || dropAddress || 'Selected Venue'}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => onClose()}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                style={styles.closeBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color="#475569" />
              </TouchableOpacity>
            </View>

            {/* Section 1: Preferred Car Model */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.sectionBadge}>
                  <Ionicons name="car-sport" size={15} color="#D97706" />
                </View>
                <Text style={styles.sectionTitle}>1. Preferred Car Model</Text>
              </View>

              {/* Search / Manual Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="search-outline" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Select or enter car model (e.g. Innova, Fortuner)"
                  placeholderTextColor="#94A3B8"
                  value={selectedCarNameInput}
                  onChangeText={(txt) => {
                    setSelectedCarNameInput(txt);
                    const found = weddingCarModels?.find((c) =>
                      c.name.toLowerCase().includes(txt.toLowerCase())
                    );
                    if (found) setSelectedCarModel(found.id);
                  }}
                />
                {!!selectedCarNameInput && (
                  <TouchableOpacity
                    onPress={() => setSelectedCarNameInput('')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="close-circle" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Horizontal Car Cards Carousel */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsScroll}
              >
                {weddingCarModels?.map((car) => {
                  const isSelected = selectedCarModel === car.id;
                  return (
                    <TouchableOpacity
                      key={car.id}
                      style={[
                        styles.carCard,
                        isSelected ? styles.carCardSelected : styles.carCardDefault,
                      ]}
                      activeOpacity={0.85}
                      onPress={() => {
                        setSelectedCarModel(car.id);
                        setSelectedCarNameInput(car.name);
                      }}
                    >
                      {isSelected && (
                        <View style={styles.cardCheckmark}>
                          <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                        </View>
                      )}

                      <View
                        style={[
                          styles.carIconBox,
                          isSelected ? styles.carIconBoxSelected : styles.carIconBoxDefault,
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={car.id === 'vintage' ? 'car-estate' : 'car-side'}
                          size={28}
                          color={isSelected ? '#D97706' : '#64748B'}
                        />
                      </View>

                      <Text
                        style={[
                          styles.carCardName,
                          isSelected && styles.carCardNameSelected,
                        ]}
                        numberOfLines={1}
                      >
                        {car.name}
                      </Text>

                      <Text style={styles.carCardType} numberOfLines={1}>
                        {car.type}
                      </Text>

                      <View
                        style={[
                          styles.priceTag,
                          isSelected ? styles.priceTagSelected : styles.priceTagDefault,
                        ]}
                      >
                        <Text
                          style={[
                            styles.priceTagText,
                            isSelected ? styles.priceTagTextSelected : styles.priceTagTextDefault,
                          ]}
                        >
                          {car.pricePerDay ? `₹${car.pricePerDay.toLocaleString('en-IN')}/day` : 'Luxury Fleet'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Section 2: Number of Vehicles */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.sectionBadge}>
                  <MaterialCommunityIcons name="numeric" size={16} color="#D97706" />
                </View>
                <Text style={styles.sectionTitle}>2. Number of Vehicles</Text>
              </View>

              <View style={styles.quantityWrapper}>
                {/* Stepper Counter */}
                <View style={styles.stepperContainer}>
                  <TouchableOpacity
                    style={[
                      styles.stepperBtn,
                      carQuantity <= 1 && styles.stepperBtnDisabled,
                    ]}
                    disabled={carQuantity <= 1}
                    onPress={() => setCarQuantity((prev) => Math.max(1, prev - 1))}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="remove"
                      size={18}
                      color={carQuantity <= 1 ? '#CBD5E1' : '#0F172A'}
                    />
                  </TouchableOpacity>

                  <View style={styles.stepperValueBox}>
                    <Text style={styles.stepperNumber}>{carQuantity}</Text>
                    <Text style={styles.stepperLabel}>
                      {carQuantity === 1 ? 'Vehicle' : 'Vehicles'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.stepperBtn,
                      styles.stepperBtnPlus,
                      carQuantity >= 20 && styles.stepperBtnDisabled,
                    ]}
                    disabled={carQuantity >= 20}
                    onPress={() => setCarQuantity((prev) => Math.min(20, prev + 1))}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="add"
                      size={18}
                      color={carQuantity >= 20 ? '#CBD5E1' : '#FFFFFF'}
                    />
                  </TouchableOpacity>
                </View>

                {/* Quick Selection Preset Pills */}
                <View style={styles.presetPillsRow}>
                  {[1, 2, 3, 5].map((q) => {
                    const isActive = carQuantity === q;
                    return (
                      <TouchableOpacity
                        key={q}
                        style={[
                          styles.presetPill,
                          isActive ? styles.presetPillActive : styles.presetPillDefault,
                        ]}
                        onPress={() => setCarQuantity(q)}
                        activeOpacity={0.75}
                      >
                        <Text
                          style={[
                            styles.presetPillText,
                            isActive && styles.presetPillTextActive,
                          ]}
                        >
                          {q} {q === 1 ? 'Car' : 'Cars'}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Section 3: Vehicle Color Theme */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.sectionBadge}>
                  <Ionicons name="color-palette" size={15} color="#D97706" />
                </View>
                <Text style={styles.sectionTitle}>3. Vehicle Color Theme</Text>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="brush-outline" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Select or enter color (e.g. Royal White, Phantom Black)"
                  placeholderTextColor="#94A3B8"
                  value={selectedColorInput}
                  onChangeText={(txt) => {
                    setSelectedColorInput(txt);
                    const found = weddingCarColors?.find((c) =>
                      c.label.toLowerCase().includes(txt.toLowerCase())
                    );
                    if (found) setSelectedColor(found.id);
                  }}
                />
                {!!selectedColorInput && (
                  <TouchableOpacity
                    onPress={() => setSelectedColorInput('')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="close-circle" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Color Swatch Options */}
              <View style={styles.colorChipsGrid}>
                {weddingCarColors?.map((color) => {
                  const isSelected = selectedColor === color.id;
                  return (
                    <TouchableOpacity
                      key={color.id}
                      style={[
                        styles.colorChip,
                        isSelected ? styles.colorChipSelected : styles.colorChipDefault,
                      ]}
                      activeOpacity={0.85}
                      onPress={() => {
                        setSelectedColor(color.id);
                        setSelectedColorInput(color.label);
                      }}
                    >
                      <View
                        style={[
                          styles.colorCircle,
                          {
                            backgroundColor: color.hex,
                            borderColor: color.border || '#CBD5E1',
                          },
                        ]}
                      />
                      <Text
                        style={[
                          styles.colorChipText,
                          isSelected && styles.colorChipTextSelected,
                        ]}
                      >
                        {color.label}
                      </Text>
                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={14}
                          color="#D97706"
                          style={{ marginLeft: 2 }}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Section 4: Event Date */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.sectionBadge}>
                  <Ionicons name="calendar" size={15} color="#D97706" />
                </View>
                <Text style={styles.sectionTitle}>4. Event Date</Text>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter event date (e.g. Tomorrow, 15 Dec 2026)"
                  placeholderTextColor="#94A3B8"
                  value={customDate || weddingDate}
                  onChangeText={(txt) => setCustomDate(txt)}
                />
                {!!customDate && (
                  <TouchableOpacity
                    onPress={() => setCustomDate('')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="close-circle" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Quick Preset Date Pills */}
              <View style={styles.dateChipsRow}>
                {getPresetDates?.().map((p) => {
                  const isSelected = !customDate && weddingDate === p.iso;
                  return (
                    <TouchableOpacity
                      key={p.id}
                      style={[
                        styles.dateChip,
                        isSelected ? styles.dateChipSelected : styles.dateChipDefault,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => {
                        setWeddingDate(p.iso);
                        setCustomDate('');
                      }}
                    >
                      <Ionicons
                        name={isSelected ? 'calendar' : 'calendar-outline'}
                        size={13}
                        color={isSelected ? '#0F172A' : '#64748B'}
                        style={{ marginRight: 5 }}
                      />
                      <Text
                        style={[
                          styles.dateChipText,
                          isSelected && styles.dateChipTextSelected,
                        ]}
                      >
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              style={styles.confirmButton}
              activeOpacity={0.85}
              onPress={() => onClose()}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.confirmButtonText}>Confirm Fleet Details</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  backdropDismiss: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    maxHeight: '88%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 20,
  },
  dragBar: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  /* Header */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  headerTextWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  venueSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    fontWeight: '600',
    flex: 1,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Sections */
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* Input Box */
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    padding: 0,
  },

  /* Car Cards Carousel */
  cardsScroll: {
    paddingVertical: 4,
    gap: 12,
  },
  carCard: {
    width: 148,
    padding: 12,
    borderRadius: 16,
    position: 'relative',
  },
  carCardDefault: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  carCardSelected: {
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderColor: '#D97706',
  },
  cardCheckmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D97706',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  carIconBoxDefault: {
    backgroundColor: '#F8FAFC',
  },
  carIconBoxSelected: {
    backgroundColor: '#FEF3C7',
  },
  carCardName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  carCardNameSelected: {
    color: '#92400E',
    fontWeight: '800',
  },
  carCardType: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  priceTag: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  priceTagDefault: {
    backgroundColor: '#F1F5F9',
  },
  priceTagSelected: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  priceTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  priceTagTextDefault: {
    color: '#475569',
  },
  priceTagTextSelected: {
    color: '#B45309',
  },

  /* Quantity Stepper */
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 4,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperBtnPlus: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  stepperBtnDisabled: {
    opacity: 0.35,
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  stepperValueBox: {
    paddingHorizontal: 14,
    alignItems: 'center',
    minWidth: 64,
  },
  stepperNumber: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  stepperLabel: {
    fontSize: 9.5,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 1,
  },
  presetPillsRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  presetPill: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetPillDefault: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  presetPillActive: {
    backgroundColor: '#0F172A',
    borderWidth: 1.2,
    borderColor: '#0F172A',
  },
  presetPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  presetPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  /* Color Chips */
  colorChipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  colorChipDefault: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  colorChipSelected: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#D97706',
  },
  colorCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
  },
  colorChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#334155',
  },
  colorChipTextSelected: {
    color: '#92400E',
    fontWeight: '700',
  },

  /* Date Chips */
  dateChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  dateChipDefault: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  dateChipSelected: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#D97706',
  },
  dateChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  dateChipTextSelected: {
    color: '#92400E',
    fontWeight: '700',
  },

  /* Confirm Button */
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginTop: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
