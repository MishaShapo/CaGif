//
//  FitnessData.h
//  CaGif
//
//  Created by Michail Shaposhnikov on 1/6/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@import HealthKit;

@interface FitnessData : NSObject <RCTBridgeModule>

@property (nonatomic) HKHealthStore* healthKitStore;

@end
