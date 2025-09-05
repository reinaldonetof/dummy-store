//
//  CalendarReminderModule.c
//  dummystore
//
//  Created by Reinaldo Neto on 05/09/25.
//
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarReminderModule, NSObject)

RCT_EXTERN_METHOD(requestCalendarPermission:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(addProductReminder:(NSString *)productName
                  productDescription:(NSString *)productDescription
                  reminderDate:(NSString *)reminderDate
                  productUrl:(NSString *)productUrl
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

@end
