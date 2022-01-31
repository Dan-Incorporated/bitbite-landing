/*
 *  ====================================================
 *  Copyright (c) 2021. Daniel Nazarian
 *
 *  Do not use, edit or distribute without explicit permission.
 *  Questions, comments or concerns -> email dnaz@danielnazarian.com
 * ======================================================
 */

import 'package:bitbite_landing/widgets/cards/base.dart';
import 'package:bitbite_landing/widgets/texts/link.dart';
import 'package:flutter/material.dart';
import 'package:bitbite_landing/struc/base_state.dart';
import 'package:bitbite_landing/widgets/app_bar.dart';

// ================================================================================
// HOME PAGE ======================================================================
// ================================================================================

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

// ================================================================================
// HOME PAGE STATE ================================================================
// ================================================================================

class _HomePageState extends BaseState<HomePage> {
  @override
  Widget buildBase(BuildContext context) {
    return Scaffold(
      appBar: AppBarBase(leading: Container()),
      body: Align(
        child: SizedBox(
          width: 800.0,
          child: ListView(
            children: <Widget>[
              CardBase(
                  child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          'Thank You!',
                          style: Theme.of(context).textTheme.headline2!.copyWith(
                                fontFamily: "Pacifico",
                              ),
                        ),
                        Image.asset(
                          "assets/images/donut-blue.png",
                          height: 60.0,
                        )
                      ],
                    ),
                    const Divider(),
                    Text(
                        'After nearly 4 incredible years helping small restaurants, bars and more focus on their dreams, we have decided to close our doors.\n',
                        style: Theme.of(context).textTheme.headline5),
                    Text(
                        'This was not an easy decision, but the world has changed a lot in 4 years and we want to make our contribution to the food and drink space is one that helps small businesses to prosper.',
                        style: Theme.of(context).textTheme.headline5),
                    const Divider(),
                    Text(
                        "Thank you to everyone who went along for the ride and a particularly huge 'thank you' to all the small business owners who took a chance on our small business.\n",
                        style: Theme.of(context).textTheme.headline5),
                    Text("Thank you all again and stay tuned for our next adventure!",
                        textAlign: TextAlign.center, style: Theme.of(context).textTheme.headline4!.copyWith(fontFamily: "Pacifico"))
                  ],
                ),
              )),
              CardBase(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget> [
                      Text("Questions, comments or concerns?", style: Theme.of(context).textTheme.headline4!.copyWith(
                        fontFamily: "Pacifico"
                      ),),
                      const Divider(),
                      TextLink(
                        text: "If you'd like to contact our team, reach out here.",
                        textToHighlight: 'here',
                        url: "https://danielnazarian.com/contact",
                        style: Theme.of(context).textTheme.headline6,
                      )
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
