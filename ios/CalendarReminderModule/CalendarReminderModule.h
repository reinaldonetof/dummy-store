//
//  CalendarReminderModule.h
//  dummystore
//
//  Created by Reinaldo Neto on 05/09/25.
//
#import <React/RCTBridgeModule.h>
#import <EventKit/EventKit.h>

@interface CalendarReminderModule : NSObject <RCTBridgeModule>

@property (nonatomic, strong) EKEventStore *eventStore;

@end
