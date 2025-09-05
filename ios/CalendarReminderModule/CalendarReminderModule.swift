//
//  CalendarReminderModule.swift
//  dummystore
//
//  Created by Reinaldo Neto on 05/09/25.
//

import Foundation
import React
import EventKit

@objc(CalendarReminderModule)
class CalendarReminderModule: NSObject {
  
  private let eventStore = EKEventStore()
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func requestCalendarPermission(_ resolve: @escaping RCTPromiseResolveBlock,
                                 rejecter reject: @escaping RCTPromiseRejectBlock) {
    let status = EKEventStore.authorizationStatus(for: .reminder)
    if status == .authorized {
      resolve(true)
      return
    }
    
    if status == .denied || status == .restricted {
      reject("PERMISSION_DENIED", "Calendar permission denied", nil)
      return
    }
    
    eventStore.requestAccess(to: .reminder) { [weak self] granted, error in
      DispatchQueue.main.async {
        if let error = error {
          reject("PERMISSION_ERROR", error.localizedDescription, error)
        } else {
          resolve(granted)
        }
      }
    }
  }
  
  @objc
  func addProductReminder(_ productName: String,
                          productDescription: String,
                          reminderDate: String,
                          productUrl: String,
                          resolver resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock) {
    
    // Check permission
    let status = EKEventStore.authorizationStatus(for: .reminder)
    guard status == .authorized else {
      reject("PERMISSION_DENIED", "Calendar permission not granted", nil)
      return
    }
    
    // Parse the date
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    formatter.timeZone = TimeZone(abbreviation: "UTC")
    guard let reminderDateTime = formatter.date(from: reminderDate) else {
      reject("INVALID_DATE", "Invalid date format.", nil)
      return
    }
    
    // Create the reminder
    let reminder = EKReminder(eventStore: eventStore)
    reminder.title = "Purchase: \(productName)"
    var notes = "Product: \(productName)\n"
    notes += "Description: \(productDescription)\n"
    if !productUrl.isEmpty {
      notes += "URL: \(productUrl)"
    }
    reminder.notes = notes
    
    let calendar = Calendar.current
    reminder.dueDateComponents = calendar.dateComponents([.year, .month, .day, .hour, .minute],
                                                         from: reminderDateTime)
    reminder.calendar = eventStore.defaultCalendarForNewReminders()
    
    do {
      try eventStore.save(reminder, commit: true)
      print("Successfully created reminder for product: \(productName)")
      resolve(true)
    } catch {
      let errorMessage = error.localizedDescription
      print("Failed to create reminder: \(errorMessage)")
      reject("SAVE_ERROR", errorMessage, error)
    }
  }
}
